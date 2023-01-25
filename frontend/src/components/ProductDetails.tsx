import useProduct from "../hooks/useProduct";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {IMAGES_PATH} from "../model/aplicationProp";
import axios from "axios";
import {Product} from "../model/Product";

export default function ProductDetails() {

    const {id} = useParams();
    const [product] = useProduct(id as string);
    const [presentPhoto, setPresentPhoto] = useState<string>("")


    let sidePhotos = product.imageURLs.map((img, index) => {

            return <div key={index} className={" card  border-5 side-photo " }>
                        <img
                            src={IMAGES_PATH + img}
                            onClick={() =>{
                            setPresentPhoto(IMAGES_PATH + img)
                        } } alt="..."/>
                  </div>
                }
             )


     const addToCart = async () => {
         const res = await axios.put("/api/orders/"+id)
     }

    return (<>


            <div>
                <div className={" details-container "}>
                    <div>{product.imageURLs.map((img, index) => {

                            return <div key={index} className={" card  border-5 side-photo "}>
                                <img
                                    src={IMAGES_PATH + img}
                                    onClick={() => {
                                        setPresentPhoto(IMAGES_PATH + img)
                                    }} alt="..."/>
                            </div>
                        }
                    )}
                    </div>

                        <img src={presentPhoto ? presentPhoto : IMAGES_PATH + product.imageURLs[0]}
                             className="present-photo " style={{width: "25rem"}} alt={product.imageURLs[0]}/>

                    <div className={"text-buttons-container"}>
                        <p className={"description"}>Step into the season in style with our latest collection of
                            clothing.From flowy dresses to tailored suits, we have something for every occasion." </p>
                        <div className={"details-button-container"}>
                            <button className="btn m-t-3 add-to-cart-button" type="button" onClick={addToCart} >In den Warenkorb</button>
                            <button className="btn buy-button" type="button" >Kaufen</button>
                        </div>
                    </div>

                </div>




            </div>


        </>
    )
}








