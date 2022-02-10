const express = require('express');
const app = express();
const pg = require('pg');
const seed = require('./sql');
const Client = pg.Client;
const client = new Client(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_pg');

app.get('/', async(req, res) => {
    try {
        const query = "SELECT * FROM meal;";
        const response = await client.query(query);
        const meals = response.rows;

        const html = `
            <html>
                <body>
                    <h1>The Not Wendy's Breakfast Menu</h1>
                    <table>
                        <tr>
                            <th>Meal</th>
                            <th>Price</th>
                        </tr>
                        ${meals.map(meal => {
                            return `<tr>
                                <td><a href="/${meal.id}">${meal.name}</a></td><td>${meal.price}</td>
                            </tr>`;
                        }).join('')}
                    </table>
                </body>
            </html>
        `;
        res.send(html);
    } catch(err) {
        next(err);
    }
    
});

app.get('/:id', async(req, res, next) => {
    const query = `SELECT food.name
    FROM food INNER JOIN mealItems ON mealItems.food_id = food.id
    INNER JOIN meal ON mealItems.meal_id = meal.id
    WHERE meal.id = $1;`
    
    const response = await client.query(query, [req.params.id]);
    const meals = response.rows;

    const html = `
        <html>
            <body>
                <h1>The Not Wendy's Breakfast Menu</h1>
                <h2>Your Meal Items</h2>
                <table>
                    <tr>
                        <th>Meal</th>
                        
                    </tr>
                    ${meals.map(meal => {
                        return `<tr>
                            <td>${meal.name}</td>
                        </tr>`;
                    }).join('')}
                </table>
            </body>
        </html>
    `;
    res.send(html);
});

const startup = async() => {
    await client.connect();
    console.log("connected");

    const sql = seed();
    await client.query(sql);

    const port = 3000;
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    })
};

startup();