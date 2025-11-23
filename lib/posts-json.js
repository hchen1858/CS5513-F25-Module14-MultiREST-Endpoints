// Import the Node.js file system module for reading files
//import fs from 'fs';
// Import the Node.js path module for handling file paths
//import path from 'path';

// MUST have installed got npm via npm install got@9.6.0
import got from 'got';


// Create a constant that points to the 'data' directory relative to the current working directory
//const dataDirectory = path.join(process.cwd(), 'data');

// Define URL for REST endpoint that contains cat neighbors data, increasing number of posts per page to 100
const dataURL = "https://dev-cs-5513-fall-2025-w12.pantheonsite.io/wp-json/wp/v2/catid?per_page=100";


// Export a function that retrieves and returns all posts sorted alphabetically by title
export async function getSortedPostsData(){

    // Construct the full file path to the posts.json file in the data directory
    //const filePath = path.join(dataDirectory, 'posts.json');
    // Read the contents of the posts.json file as a UTF-8 encoded string
    //const jsonString = fs.readFileSync(filePath, 'utf8');
    let jsonString;
    try {
        // Fetch data from the REST endpoint using got
        jsonString = await got(dataURL);
        // Display the response body as a string
        //console.log(jsonString.body);
    } catch (error) {
        jsonString.body = [];
        // Log any errors that occur during the fetch operation
        console.log(error);
    }

    // Parse the JSON string into a JavaScript object/array
    //const jsonObj = JSON.parse(jsonString);
    const jsonObj = JSON.parse(jsonString.body);
    //console.log(jsonObj);

    // Sort the array of posts alphabetically by title using locale-aware string comparison
    jsonObj.sort(function(a,b) {
        return a.acf.cat_name.localeCompare(b.acf.cat_name);
    });
    // Transform each post object to ensure id is a string and return the modified array
    return jsonObj.map(item => {
        return {
            // Convert the id to a string to ensure consistent data type
            id: item.id.toString(),
            // Include the cat name
            title: item.acf.cat_name,
            // Include the post date
            date:item.date        
            // Include the path to the post's image
            //imagePath: item.imagePath,
            // Include the alt text for the post's image
            //altText: item.altText,
            // Include the HTML content of the post
            //contentHtml: item.contentHtml
        }
    });

    }

// Export a function that retrieves and returns all cat food data sorted alphabetically by food name
export async function getSortedCatFoodData(){

    // Define URL for catfood REST endpoint
    const catFoodURL = "https://dev-cs-5513-fall-2025-w12.pantheonsite.io/wp-json/wp/v2/catfood?per_page=100";
    
    let jsonString;
    try {
        // Fetch data from the REST endpoint using got
        jsonString = await got(catFoodURL);
    } catch (error) {
        jsonString.body = [];
        // Log any errors that occur during the fetch operation
        console.log(error);
    }

    // Parse the JSON string into a JavaScript object/array
    const jsonObj = JSON.parse(jsonString.body);

    // Sort the array of posts alphabetically by food name using locale-aware string comparison
    jsonObj.sort(function(a,b) {
        return a.acf.food_name.localeCompare(b.acf.food_name);
    });
    // Transform each post object to ensure id is a string and return the modified array
    return jsonObj.map(item => {
        return {
            // Convert the id to a string to ensure consistent data type
            id: item.id.toString(),
            // Include the food name
            title: item.acf.food_name,
            // Include the post date
            date:item.date        
        }
    });

}

// Export a function that retrieves and returns all cat toy data sorted alphabetically by toy name
export async function getSortedCatToysData(){

    // Define URL for cattoy REST endpoint
    const catToyURL = "https://dev-cs-5513-fall-2025-w12.pantheonsite.io/wp-json/wp/v2/cattoy?per_page=100";
    
    let jsonString;
    try {
        // Fetch data from the REST endpoint using got
        jsonString = await got(catToyURL);
    } catch (error) {
        jsonString.body = [];
        // Log any errors that occur during the fetch operation
        console.log(error);
    }

    // Parse the JSON string into a JavaScript object/array
    const jsonObj = JSON.parse(jsonString.body);

    // Sort the array of posts alphabetically by toy name using locale-aware string comparison
    jsonObj.sort(function(a,b) {
        return a.acf.toy_name.localeCompare(b.acf.toy_name);
    });
    // Transform each post object to ensure id is a string and return the modified array
    return jsonObj.map(item => {
        return {
            // Convert the id to a string to ensure consistent data type
            id: item.id.toString(),
            // Include the toy name
            title: item.acf.toy_name,
            // Include the post date
            date:item.date        
        }
    });

}

// Export a function that returns all post IDs formatted for Next.js dynamic routing
export async function getAllPostIds(){
    // Construct the full file path to the posts.json file in the data directory
    //const filePath = path.join(dataDirectory, 'posts.json');
    // Read the contents of the posts.json file as a UTF-8 encoded string
    //const jsonString = fs.readFileSync(filePath, 'utf8');

    let jsonString;
    try {
        // Fetch data from the REST endpoint using got
        jsonString = await got(dataURL);
        // Display the response body as a string
        //console.log(jsonString.body);
    } catch (error) {
        jsonString.body = [];
        // Log any errors that occur during the fetch operation
        console.log(error);
    }

    // Parse the JSON string into a JavaScript object/array
    //const jsonObj = JSON.parse(jsonString);
    const jsonObj = JSON.parse(jsonString.body);

    // Transform each post into an object with params structure required by Next.js getStaticPaths
    return jsonObj.map(item => {
        return {
            // Create a params object containing the post ID
            params: {
                // Convert the id to a string and assign it to the id parameter
                id: item.id.toString()
            }
        }
    });
}

// Export a function that retrieves a specific post by its ID
export async function getPostData(ID){
    // Construct the full file path to the posts.json file in the data directory
    //const filePath = path.join(dataDirectory, 'posts.json');
    // Read the contents of the posts.json file as a UTF-8 encoded string
    //const jsonString = fs.readFileSync(filePath, 'utf8');
    let jsonString;
    try {
        // Fetch data from the REST endpoint using got
        jsonString = await got(dataURL);
        // Display the response body as a string
        //console.log(jsonString.body);
    } catch (error) {
        jsonString.body = [];
        // Log any errors that occur during the fetch operation
        console.log(error);
    }

    // Parse the JSON string into a JavaScript object/array
    //const jsonObj = JSON.parse(jsonString);
    const jsonObj = JSON.parse(jsonString.body);
    // Filter the posts array to find the post with the matching ID
    const objReturned = jsonObj.filter(obj => {
        // Compare the post's ID (converted to string) with the provided ID parameter
        //console.log(obj.id.toString());
        //console.log(ID);
        return obj.id.toString() === ID;
    });
    //console.log(objReturned);

    // Check if no post was found with the given ID
    if (objReturned.length === 0) {
        // Return a default "not found" object with placeholder values
        return {
            id: "id",
            //post_title: "Not found",
            date: "Not found",
            cat_pic: "Not found",
            //altText: "Not found",
            //contentHtml: "Not found"
        }
    } else {
        // Return the first (and should be only) matching post object
        //console.log(objReturned[0]);
        return objReturned[0]
    }

    }

// Export a function that returns all cat food IDs formatted for Next.js dynamic routing
export async function getAllCatFoodIds(){
    // Define URL for catfood REST endpoint
    const catFoodURL = "https://dev-cs-5513-fall-2025-w12.pantheonsite.io/wp-json/wp/v2/catfood?per_page=100";

    let jsonString;
    try {
        // Fetch data from the REST endpoint using got
        jsonString = await got(catFoodURL);
    } catch (error) {
        jsonString.body = [];
        // Log any errors that occur during the fetch operation
        console.log(error);
    }

    // Parse the JSON string into a JavaScript object/array
    const jsonObj = JSON.parse(jsonString.body);

    // Transform each post into an object with params structure required by Next.js getStaticPaths
    return jsonObj.map(item => {
        return {
            // Create a params object containing the post ID
            params: {
                // Convert the id to a string and assign it to the id parameter
                id: item.id.toString()
            }
        }
    });
}

// Export a function that retrieves a specific cat food item by its ID
export async function getCatFoodData(ID){
    // Define URL for catfood REST endpoint
    const catFoodURL = "https://dev-cs-5513-fall-2025-w12.pantheonsite.io/wp-json/wp/v2/catfood?per_page=100";
    
    let jsonString;
    try {
        // Fetch data from the REST endpoint using got
        jsonString = await got(catFoodURL);
    } catch (error) {
        jsonString.body = [];
        // Log any errors that occur during the fetch operation
        console.log(error);
    }

    // Parse the JSON string into a JavaScript object/array
    const jsonObj = JSON.parse(jsonString.body);
    // Filter the posts array to find the post with the matching ID
    const objReturned = jsonObj.filter(obj => {
        // Compare the post's ID (converted to string) with the provided ID parameter
        return obj.id.toString() === ID;
    });

    // Check if no post was found with the given ID
    if (objReturned.length === 0) {
        // Return a default "not found" object with placeholder values
        return {
            id: "id",
            date: "Not found",
        }
    } else {
        // Return the first (and should be only) matching post object
        return objReturned[0]
    }

}

// Export a function that returns all cat toy IDs formatted for Next.js dynamic routing
export async function getAllCatToyIds(){
    // Define URL for cattoy REST endpoint
    const catToyURL = "https://dev-cs-5513-fall-2025-w12.pantheonsite.io/wp-json/wp/v2/cattoy?per_page=100";

    let jsonString;
    try {
        // Fetch data from the REST endpoint using got
        jsonString = await got(catToyURL);
    } catch (error) {
        jsonString.body = [];
        // Log any errors that occur during the fetch operation
        console.log(error);
    }

    // Parse the JSON string into a JavaScript object/array
    const jsonObj = JSON.parse(jsonString.body);

    // Transform each post into an object with params structure required by Next.js getStaticPaths
    return jsonObj.map(item => {
        return {
            // Create a params object containing the post ID
            params: {
                // Convert the id to a string and assign it to the id parameter
                id: item.id.toString()
            }
        }
    });
}

// Export a function that retrieves a specific cat toy item by its ID
export async function getCatToyData(ID){
    // Define URL for cattoy REST endpoint
    const catToyURL = "https://dev-cs-5513-fall-2025-w12.pantheonsite.io/wp-json/wp/v2/cattoy?per_page=100";
    
    let jsonString;
    try {
        // Fetch data from the REST endpoint using got
        jsonString = await got(catToyURL);
    } catch (error) {
        jsonString.body = [];
        // Log any errors that occur during the fetch operation
        console.log(error);
    }

    // Parse the JSON string into a JavaScript object/array
    const jsonObj = JSON.parse(jsonString.body);
    // Filter the posts array to find the post with the matching ID
    const objReturned = jsonObj.filter(obj => {
        // Compare the post's ID (converted to string) with the provided ID parameter
        return obj.id.toString() === ID;
    });

    // Check if no post was found with the given ID
    if (objReturned.length === 0) {
        // Return a default "not found" object with placeholder values
        return {
            id: "id",
            date: "Not found",
        }
    } else {
        // Return the first (and should be only) matching post object
        return objReturned[0]
    }

}