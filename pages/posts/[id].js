// Import the Layout component for consistent page structure
import Layout from '../../components/layout'; 
// Import utility functions to get all post IDs and individual post data
import { getAllPostIds, getPostData } from '../../lib/posts-json';
// Import Next.js Head component for managing page metadata
import Head from 'next/head';
// Import custom Date component for formatting dates
import Date from '../../components/date';
import Image from 'next/image';
// Import utility CSS styles for consistent styling
import utilStyles from '../../styles/utils.module.css';
// Import got for fetching REST API data
import got from 'got'; 


// Next.js static generation function that runs at build time
// This function fetches data for a specific post based on the dynamic route parameter
export async function getStaticProps({ params }) {
    // Extract post data asynchronously using the post ID from the URL parameter
    // The "await" keyword ensures we wait for the data to be fetched before proceeding
    const postData = await getPostData(params.id);
   
    // Fetch cat images from REST endpoint and find matching image
    let catImageUrl = null;
    if (postData.acf && postData.acf.cat_pic) {
        try {
            const catImagesURL = "https://dev-cs-5513-fall-2025-w12.pantheonsite.io/wp-json/twentytwentyfive-child/v1/cat-images";
            const catImagesResponse = await got(catImagesURL);
            const catImages = JSON.parse(catImagesResponse.body);
            
            // Find the matching image where ID (as string) equals cat_pic
            const matchingImage = catImages.find(img => img.ID === postData.acf.cat_pic.toString());
            
            if (matchingImage && matchingImage.guid) {
                catImageUrl = matchingImage.guid;
            }
        } catch (error) {
            console.log('Error fetching cat images:', error);
        }
    }
   
    // Return the post data as props to be passed to the Post component
    return {
      props: {
        postData,
        catImageUrl,
      },
      revalidate: 60, // Revalidate the page every 60 seconds  Next.js ISR (Incremental Static Regeneration)
    };
  }

 
// Next.js static generation function that determines which paths to pre-render
// This function tells Next.js which dynamic routes should be statically generated at build time
export async function getStaticPaths() {
  // Get all available post IDs to determine which pages to generate
  const paths = await getAllPostIds();
  return {
    paths, // Array of paths to pre-render
    fallback: false, // If a path is not found, return 404 (no fallback generation)
  };
}



// Main React component that renders an individual blog post
// Receives postData and catImageUrl as props from getStaticProps
export default function Post({ postData, catImageUrl }) {
    return (
    // Wrap the content in the Layout component for consistent page structure
      <Layout>
        {/* Use Next.js Head component to set the page title dynamically */}
        <Head>
          <title>{postData.acf.cat_name}</title>
        </Head>
        {/* Main article container with blog-specific styling */}
        <article className={utilStyles.blogArticle}>
          {/* Display the post title as the main heading */}
          <h1 className={utilStyles.headingXl}>Notes About {postData.acf.cat_name}</h1>      
          {/* Date container with custom styling */}
          <div className={utilStyles.dateTextPost}>
            {/*<p>{postData.date}</p>*/}
            <p><strong>Home Location:</strong> {postData.acf.address}</p>
            <p><strong>Favorite Food:</strong> {postData.acf.food_favs}</p>
            {/* Use custom Date component to format and display the post date */}
            {/*<Date dateString={postData.date} />*/}
          </div>
          <small className={utilStyles.lightText}>
              <Date dateString={postData.date} />
          </small>
          {/* Render the post content as HTML (converted from Markdown) */}
          {/* dangerouslySetInnerHTML is used because the content is trusted HTML from our build process */}
          {/*<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          <div className={utilStyles.friendImage}>
            <Image
                priority
                src= {postData.imagePath}
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt= {postData.altText}
              />
          </div>*/}
          {/* Display cat image at the bottom of the page if available */}
          {catImageUrl && (
            <div className={utilStyles.catImageContainer}>
              <Image
                src={catImageUrl}
                alt=""
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
              />
            </div>
          )}
         </article>
      </Layout>
    );
  }

  
