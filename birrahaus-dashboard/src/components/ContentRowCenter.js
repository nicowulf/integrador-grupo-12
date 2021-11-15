import React from 'react';
import LastProductInDb from "./LastProductInDb";
import CategoriesInDb from "./CategoriesInDb";

function ContentRowCenter(){
    return (
      <div className="row">
        {/*<!-- Last Product in DB -->*/}
        <LastProductInDb />

        {/*<!-- Styles in DB -->*/}
        <CategoriesInDb />
      </div>
    );
}

export default ContentRowCenter;