<?php
    
    //This is an archive file that contains child them code that creates two REST API endpoints.
    //Example from Week 12 latest posts by category and Week 14 cat images from wp_posts table are included.
    
    //Step 1. Tell the WordPress API to load our partent theme's css styles

    // In 2 parts: (1) call a built-in function in WP API named add_action() that extends the WP API with customer code
    //Then, Define custom function that holds the code we are using to extend the WP API

    //add-action takes 2 arguments: string for the api hook we want to extend.
    add_action('wp_enqueue_scripts', 'enqueue_parent_styles');

    function enqueue_parent_styles() {
        //Inside this function, we call another built-in function in WP API named wp_enqueue_style()
        //This function loads a CSS stylesheet into our theme

        //wp_enqueue_style() takes 2 arguments:
        //(1) a string handle for the stylesheet we want to load
        //(2) the location of the stylesheet we want to load

        wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');

    }

    //Step 2: Tell WP API to register a new REST url endpoint
    // In 2 parts:  (1) Call built-in add_action() to extend the WP API with custom code
    add_action('rest_api_init', 'register_custom_endpoint');

    // Add our customer function to register the new REST endpoint URL
    function register_custom_endpoint() {
        //Inside this function, we call another built-in function in WP API named register_rest_route()
        //This function registers a new REST endpoint URL with the WP API

        //register_rest_route() takes 3 arguments:
        //(1) a string namespace for the new endpoint
        //(2) a string route for the new endpoint
        //(3) an array of options for the new endpoint

        register_rest_route('twentytwentyfive-child/v1', '/latest-posts/(?P<category_id>\d+)', array(
            'methods' => 'GET',
            'callback' => 'get_latest_posts_by_category'
        ));
    }

    //Step 3: Define our customer callback function that WP will run when the REST API endpoint URL we defined is received
    function get_latest_posts_by_category($request) {
        //Get the category_id value WP passes to us
        $args = array(
            'category' => $request['category_id']            
        );

        // Call the built-in function in WP API named get_posts()
        //get_posts() takes a single associative arrray as an arrgument
        $posts = get_posts($args);

        //Check to see if WP returned at least one post
        if (empty($posts)) {
            return new WP_Error('empty_category', 'No posts to display', array('status' => 404));
        }

        //If we make it to here, SP get_posts() returned at least one post
        //Let us send back the data for the found posts(s)
        $response = new WP_REST_Response($posts);
        $response->set_status(200);
        //Send back the REST response object filled up with all of the posts we found
        return $response;
    }

// Week 14: adding custom endpoint for extracting subset data from wp_posts table for image URLs from catid and cattoys custom tables
// Each ACF post type with image field has an image ID post number stored in the wp_posts table under column "id" with the URL string in the "guid" column
// Uses the global $wpdb object to run a custom SQL query to get data from wp_posts table that is focused to desired images and minimizes data transfer size
    add_action('rest_api_init', 'register_cat_table_endpoint');

    function register_cat_table_endpoint() {
        register_rest_route('twentytwentyfive-child/v1', '/cat-images', array(
            'methods' => 'GET',
            'callback' => 'get_catimages_via_sql'
        ));
    }

    function get_catimages_via_sql($request) {
        //Get access to the $wpdb global variable
        global $wpdb;

        // Get WordPress SQL table prefix string to use in query, typically "wp_" but could be different
        $pre = $wpdb-> prefix;
        // Define a SQL query string
        $query = "SELECT * FROM " . $pre . "posts" . " WHERE post_type = 'attachment'";
        // Call the built-in method get_restuls() in the $wpdb glocbal object
        $results = $wpdb -> get_results($query);     

        //IF result is empty send back and error
        if (empty($results)) {
            return new WP_Error('no_data', 'No data found in custom table', array('status' => 404));
        }

        //Send back the data for the found posts in the target table using WP REST API
        $response = new WP_REST_Response($results);        
        $response->set_status(200);
        return $response;
    } 

?>

