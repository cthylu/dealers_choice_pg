module.exports = () => {
    return `
        DROP TABLE IF EXISTS mealItems;
        DROP TABLE IF EXISTS meal;
        DROP TABLE IF EXISTS food;

        CREATE TABLE meal (
            id SERIAL PRIMARY KEY,
            name VARCHAR(30),
            price INTEGER
        );
        CREATE TABLE food (
            id SERIAL PRIMARY KEY,
            name VARCHAR(30),
            price INTEGER
        );
        CREATE TABLE mealItems (
            id SERIAL PRIMARY KEY,
            food_id INTEGER,
            meal_id INTEGER
        );
        INSERT INTO meal(name, price) VALUES ('Breakfast Baconator Combo', 6);
        INSERT INTO meal(name, price) VALUES ('Honey Butter Chicken Biscuit', 5);
        INSERT INTO meal(name, price) VALUES ('Breakfast Croissant', 5);
        
        INSERT INTO food(name, price) VALUES ('Coke', 2);
        INSERT INTO food(name, price) VALUES ('Potato Wedges', 1);
        INSERT INTO food(name, price) VALUES ('Bacon Sandwich', 4);
        INSERT INTO food(name, price) VALUES ('Chicken Biscuit', 3);
        INSERT INTO food(name, price) VALUES ('Sausage Egg & Cheese Croissant', 3);

        INSERT INTO mealItems(food_id, meal_id) VALUES (1, 1);
        INSERT INTO mealItems(food_id, meal_id) VALUES (1, 2);
        INSERT INTO mealItems(food_id, meal_id) VALUES (1, 3);
        INSERT INTO mealItems(food_id, meal_id) VALUES (2, 1);
        INSERT INTO mealItems(food_id, meal_id) VALUES (2, 2);
        INSERT INTO mealItems(food_id, meal_id) VALUES (2, 3);
        INSERT INTO mealItems(food_id, meal_id) VALUES (3, 1);
        INSERT INTO mealItems(food_id, meal_id) VALUES (4, 2);
        INSERT INTO mealItems(food_id, meal_id) VALUES (5, 3);
    `
};