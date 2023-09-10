import 'styles/comingsoon.scss'

export const metadata = {
  title: "The Playground",
  charset: "UTF-8",
  viewport: "width=device-width, initial-scale=1",
};

const Layout = () => {
  return (
    <html lang="en">
      {/* <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Raleway"
      />  */}
      <body>
        <div class="bgimg w3-display-container w3-animate-opacity w3-text-white">
          <div class="w3-display-topleft w3-padding-large w3-xlarge">Logo</div>
          <div class="w3-display-middle">
            <h1 class="w3-jumbo w3-animate-top">COMING SOON</h1>
            <hr
              class="w3-border-grey"
              style={{ margin: "auto", width: "40%" }}
            />
            <p class="w3-large w3-center">35 days left</p>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
