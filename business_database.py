import sqlite3  
import os  #import os to handle file paths

#define fixed database location
DB_DIR = os.path.join(os.path.expanduser("~"), "BizzyBee")
DB_PATH = os.path.join(DB_DIR, "businesses.db")

#ensure database directory exists
os.makedirs(DB_DIR, exist_ok=True)

class Business:
    
    #function to initiliaze new bussiness instance
    def __init__(self, name, owner, description, niche): 
        self.name = name
        self.owner = owner
        self.description = description
        self.niche = niche
        
    #function to add business details to the SQLite database
    def add_to_db(self): 
        conn = sqlite3.connect(DB_PATH)  #connect to the database
        cursor = conn.cursor() #cursor created to execute SQL commands
        
        #create table to store info entered in the fields
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS businesses (
                id INTEGER PRIMARY KEY, 
                name TEXT, 
                owner TEXT, 
                description TEXT, 
                niche TEXT
            )
        ''')

        #insert business details into the database
        cursor.execute('''
            INSERT INTO businesses (name, owner, description, niche) 
            VALUES (?, ?, ?, ?)
        ''', (self.name, self.owner, self.description, self.niche))
        
        conn.commit()  
        conn.close()  

#prompts user for business info & stores them as variables
def add_new_business():
    print("Enter your business details")
    name = input("Business Name: ")
    owner = input("Owner Name: ")
    description = input("Description: ")
    niche = input("Business Niche (e.g., Food, Photography, Tech): ")
    
    new_business = Business(name, owner, description, niche) #create new business object with the entered info
    new_business.add_to_db()  #store business in the database
    print(f"{name} has been added to the database.")

#function to search for businesses based on category
def search_businesses(category):
    conn = sqlite3.connect(DB_PATH) #connect to the database
    cursor = conn.cursor()
    
    #get the businesses that match the category
    cursor.execute('''
        SELECT name, owner, description, niche 
        FROM businesses 
        WHERE niche LIKE ?
    ''', (f'%{category}%',))
    
    results = cursor.fetchall()  #get all matching businesses
    conn.close()  
    
    return results

#function to display businesses based on user input
def display_businesses():
    category = input("Enter a category to filter businesses (type 'all' to see all businesses): ")
    
    if category.lower() == 'all':  
        category = '%' #retreive all businesses in the database
    
    results = search_businesses(category) #calls function to get matching businesses
    
    if results:
        print("\nMatching Businesses:")
        for name, owner, description, niche in results:  
            print(f"Name: {name}\nOwner: {owner}\nDescription: {description}\nCategory: {niche}\n")
    else:
        print("No businesses found in this category.")
        
#main function to handle user choices
def main():
    while True:
        print("\nBizzyBee")
        print("1. Register your business")
        print("2. Search for businesses")
        print("3. Exit")
        
        choice = input("Choose an option: ")
        
        if choice == "1":
            add_new_business()
        elif choice == "2":
            display_businesses()
        elif choice == "3":
            print("Thank you for using BizzyBee!")
            break
        else:
            print("Invalid choice.")


if __name__ == "__main__":
    main()

