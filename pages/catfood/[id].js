// Import the Layout component for consistent page structure
import Layout from '../../components/layout'; 
// Import utility functions to get all cat food IDs and individual cat food data
import { getAllCatFoodIds, getCatFoodData } from '../../lib/posts-json';
// Import Next.js Head component for managing page metadata
import Head from 'next/head';
// Import custom Date component for formatting dates
import Date from '../../components/date';
// Import utility CSS styles for consistent styling
import utilStyles from '../../styles/utils.module.css'; 


// Next.js static generation function that runs at build time
// This function fetches data for a specific cat food item based on the dynamic route parameter
export async function getStaticProps({ params }) {
    // Extract cat food data asynchronously using the item ID from the URL parameter
    // The "await" keyword ensures we wait for the data to be fetched before proceeding
    const postData = await getCatFoodData(params.id);
   
    // Return the cat food data as props to be passed to the CatFood component
    return {
      props: {
        postData,
      },
      revalidate: 60, // Revalidate the page every 60 seconds  Next.js ISR (Incremental Static Regeneration)
    };
  }

 
// Next.js static generation function that determines which paths to pre-render
// This function tells Next.js which dynamic routes should be statically generated at build time
export async function getStaticPaths() {
  // Get all available cat food IDs to determine which pages to generate
  const paths = await getAllCatFoodIds();
  return {
    paths, // Array of paths to pre-render
    fallback: false, // If a path is not found, return 404 (no fallback generation)
  };
}



// Main React component that renders an individual cat food item
// Receives postData as props from getStaticProps
export default function CatFood({ postData }) {
    return (
    // Wrap the content in the Layout component for consistent page structure
      <Layout>
        {/* Use Next.js Head component to set the page title dynamically */}
        <Head>
          <title>{postData.acf.food_name}</title>
        </Head>
        {/* Main article container with blog-specific styling */}
        <article className={utilStyles.blogArticle}>
          {/* Display the post title as the main heading */}
          <h1 className={utilStyles.headingXl}>Notes About {postData.acf.food_name}</h1>      
          {/* Date container with custom styling */}
          <div className={utilStyles.dateTextPost}>
            <p><strong>Food Name:</strong> {postData.acf.food_name}</p>
            <p><strong>Description:</strong> {postData.acf.food_description}</p>
            <p><strong>Rating:</strong> {postData.acf.rating}</p>
            <p><strong>Food Cost:</strong> {postData.acf.food_cost}</p>
          </div>
          <small className={utilStyles.lightText}>
              <Date dateString={postData.date} />
          </small>
         </article>
      </Layout>
    );
  }

  

