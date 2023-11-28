CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    UserName VARCHAR(50),
    Email VARCHAR(50),
    Password VARCHAR(50),
    PhoneNumber VARCHAR(15)  -- Assuming it includes the plus sign for country codes
);

CREATE TABLE Favorites (
    FavoritesID INT PRIMARY KEY,
    Juice VARCHAR(50),
    Coffee VARCHAR(50),
    Sandwich VARCHAR(50)
);

CREATE TABLE UserFavorites (
    UserFavoritesID INT PRIMARY KEY,
    UserID INT,
    FavoritesID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (FavoritesID) REFERENCES Favorites(FavoritesID)
);