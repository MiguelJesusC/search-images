import { Form, Formik, Field } from "formik";
import { useState } from "react";
import "./header.css";
import "./content.css";
import "./article.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const open = (url) => window.open(url);
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: " " }}
          onSubmit={async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID kxz4AXBrKyMHAjcxGk93EbvjIBzV9ukBtQ2lhp9tMCU",
                },
              }
            );
            const data = await response.json();
            setPhotos(data.results);
            console.log(data);
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join(" - ")}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
