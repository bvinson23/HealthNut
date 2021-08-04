# HealthNut

HealthNut is a Full Stack app that lets the user track their weight loss/gain journey by tracking calorie intake through meals, and calorie burning through workouts. A user is able to create a profile, inputing their goal weight. From the dashboard they can see their current goal, their current weight, their most recent meals, and recent notes. They can also add a new meal or a new workout from the dashboard.

## Installation

Run the following commands in the terminal:

```bash
git clone git@github.com:bvinson23/healthnut.git
```
Then navigate to the the directory with the HealthNut.sln file.
```bash
start HealthNut.sln
```
In a new query window, copy the SQL data from HealthNutSql.sql file to create the database
Start the server from within your IDE
The server will run at localhost:5001
Next, navigate to the client directory within HealthNut
```bash
npm start
```
The final command will run the app at localhost:3000.

## Usage

### Register a new user

When a user first opens the app, they will be presented with a log in page. The user can click register where they will be presented with a form to register for an account. Once registered they will be taken to the dashboard.

### Weighing in

Once the user is authenticated, they will be given the opportunity to do a number of things from the dashboard. If they click 'Weigh In', they will be directed to a weight log page. The user can log their weight then click 'Save'. They will then be redirected back to the dashboard.

### Adding a meal

From the dashboard, the user clicks 'Add A Meal', they will be taken to a meal form. Once saved, they will be redirected back to the dashboard.

### Adding a workout

From the dashboard, the user clicks 'Add A Workout', they will be taken to the workout form, their recent workouts will also appear on the right column of the screen instead of their recent meals.
