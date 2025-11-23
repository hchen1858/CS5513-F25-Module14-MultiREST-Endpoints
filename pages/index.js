// Import the Head component from Next.js for managing document head elements like title and meta tags
import Head from 'next/head';
// Import the Link component from Next.js for client-side navigation between pages
import Link from 'next/link';
// Import the Layout component and siteTitle constant from the layout component for consistent page structure
import Layout, { siteTitle } from '../components/layout';
// Import CSS module styles for utility classes used in this component
import utilStyles from '../styles/utils.module.css';

// Import the getSortedPostsData, getSortedCatFoodData, and getSortedCatToysData functions from the posts library to fetch and sort blog post data
import { getSortedPostsData, getSortedCatFoodData, getSortedCatToysData } from '../lib/posts-json';
// Import the Date component to format and display publication dates for blog posts
import Date from '../components/date';

 
// getStaticProps is a Next.js function that runs at build time to pre-render pages with data
// This function fetches data before the page is rendered, enabling static site generation (SSG)
export async function getStaticProps() {
  // Fetch and sort all blog post data from the three WordPress REST endpoints
  const allPostsData = await getSortedPostsData(); // catid endpoint
  const allCatFoodData = await getSortedCatFoodData(); // catfood endpoint
  const allCatToysData = await getSortedCatToysData(); // cattoy endpoint
  // Return the data as props that will be passed to the Home component
  return {
    props: {
      allPostsData, // Pass the sorted cat neighbors data to the component
      allCatFoodData, // Pass the sorted cat food data to the component
      allCatToysData, // Pass the sorted cat toy data to the component
    },
    revalidate: 60, // Revalidate the page every 60 seconds  Next.js ISR (Incremental Static Regeneration)
  };
}
 
// Main Home component that serves as the landing page for the Next.js blog application.
// This function renders the homepage with a welcome message, site title, and navigation link to the first blog post.
export default function Home({allPostsData, allCatFoodData, allCatToysData}) {
  return (
    // Return the JSX structure for the homepage
    <Layout home>
      {/* Use Next.js Head component to manage the document head */}
      <Head>
        {/* Set the page title using the siteTitle constant from layout component */}
        <title>{siteTitle}</title>
      </Head>
      {/* Create a section with heading styles for the main content */}
      <section className={utilStyles.headingMd}>
        {/* Display a personal introduction message */}
        <p>Hello, I'm Helen the British Blue cat. I'm just starting to learn the uses of WordPress REST with WP Data Access and ACF plugins.</p>
        {/* Display a sample website notice with a link to the Next.js tutorial */}
        {/*<p>
          (This is a sample website - that I'm building on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial plus the WordPress REST custom endpoint</a>.)
        </p> */}
        {/* Display a playful comment from the cat character expressing pride in their blog creation */}
        <p>Pretty good for a cat's personal blog that gets JSON data from multiple custom WordPress REST endpoints, huh?!!</p>
      </section>

       {/* Blog section that displays a list of all available blog posts on neighborhood cats */}
       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${utilStyles.blogSection}`}>
        {/* Section heading for the blog posts list */}
        <h2 className={utilStyles.headingLg}>My Cat Neighbors</h2>
        {/* Unordered list container for all blog post entries */}
        <ul className={utilStyles.list}>
          {/* Map through each blog post in allPostsData to create individual list items */}
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            {/* Create a clickable link to the individual blog post page using Next.js Link component */}
            <Link href={`/posts/${id}`}>{title}</Link>
            {/* Line break to separate the title from the date */}
            <br />
            {/* Display the publication date in smaller, lighter text using the Date component */}
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>            
          ))}
        </ul>
      </section>

      {/* Blog section that displays a list of all available blog posts on my cat toys */}
       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${utilStyles.blogSection}`}>
        {/* Section heading for the blog posts list */}
        <h2 className={utilStyles.headingLg}>My Cat Toys</h2>
        {/* Unordered list container for all blog post entries */}
        <ul className={utilStyles.list}>
          {/* Map through each blog post in allCatToysData to create individual list items */}
          {allCatToysData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            {/* Create a clickable link to the individual blog post page using Next.js Link component */}
            <Link href={`/cattoy/${id}`}>{title}</Link>
            {/* Line break to separate the title from the date */}
            <br />
            {/* Display the publication date in smaller, lighter text using the Date component */}
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>            
          ))}
        </ul>
      </section>    

      {/* Blog section that displays a list of all available blog posts on my cat foods */}
       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${utilStyles.blogSection}`}>
        {/* Section heading for the blog posts list */}
        <h2 className={utilStyles.headingLg}>My Cat Foods</h2>
        {/* Unordered list container for all blog post entries */}
        <ul className={utilStyles.list}>
          {/* Map through each blog post in allCatFoodData to create individual list items */}
          {allCatFoodData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            {/* Create a clickable link to the individual blog post page using Next.js Link component */}
            <Link href={`/catfood/${id}`}>{title}</Link>
            {/* Line break to separate the title from the date */}
            <br />
            {/* Display the publication date in smaller, lighter text using the Date component */}
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>            
          ))}
        </ul>
      </section>                    

      {/* Closing Layout component */}
    </Layout>
  );
}