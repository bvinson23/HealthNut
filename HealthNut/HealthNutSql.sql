USE [master]

If db_id('HealthNut') IS NULL
	CREATE DATABASE[HealthNut]
GO

USE [HealthNut]
GO

DROP TABLE IF EXISTS [users];
DROP TABLE IF EXISTS [workouts];
DROP TABLE IF EXISTS [meals];
DROP TABLE IF EXISTS [goals];
DROP TABLE IF EXISTS [notes];
DROP TABLE IF EXISTS [mealCategories];
GO

CREATE TABLE [users] (
  [id] int PRIMARY KEY IDENTITY NOT NULL,
  [firebaseUserId] nvarchar(255) NOT NULL,
  [name] nvarchar(25) NOT NULL,
  [email] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [workouts] (
  [id] int PRIMARY KEY IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [name] nvarchar(255) NOT NULL,
  [caloriesBurned] int NOT NULL,
  [duration] int NOT NULL
)
GO

CREATE TABLE [meals] (
  [id] int PRIMARY KEY IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [name] nvarchar(255) NOT NULL,
  [calories] int NOT NULL,
  [mealCategoryId] int NOT NULL
)
GO

CREATE TABLE [mealCategories] (
  [id] int PRIMARY KEY IDENTITY NOT NULL,
  [name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [goals] (
  [id] int PRIMARY KEY IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [description] nvarchar(255) NOT NULL,
  [targetDate] datetime NOT NULL,
  [dateComplete] datetime NOT NULL
)
GO

CREATE TABLE [notes] (
  [id] int PRIMARY KEY IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [dateCreated] datetime NOT NULL,
  [content] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [notes] ADD FOREIGN KEY ([userId]) REFERENCES [users] ([id])
GO

ALTER TABLE [goals] ADD FOREIGN KEY ([userId]) REFERENCES [users] ([id])
GO

ALTER TABLE [workouts] ADD FOREIGN KEY ([userId]) REFERENCES [users] ([id])
GO

ALTER TABLE [meals] ADD FOREIGN KEY ([userId]) REFERENCES [users] ([id])
GO

ALTER TABLE [meals] ADD FOREIGN KEY ([mealCategoryId]) REFERENCES [mealCategories] ([id])
GO
