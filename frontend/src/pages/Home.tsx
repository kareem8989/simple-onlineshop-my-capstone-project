import useProducts from "../hooks/useProducts";
import ProductContainer from "../components/ProductContainer";
import LogoutButton from "../components/LogoutButton";
import ProductCard from "../components/ProductCard";
import React, {useState} from "react";
import axios from "axios";

export default function Home() {

    const[products,setProducts] = useProducts(false);
    const[files,setFiles] =useState<File[] | null>()



    // ON SUBMIT FOR THE FORM
    const onSubmit= async (e: React.FormEvent) => {
        // FILE UPLOAD
        e.preventDefault();
        if (!files) {
            return;
        }
        const formData = new FormData();
        for (const file of files) {
            formData.append("file[]", file);
        }
        const res = await axios.post("/api/products", formData);
        setProducts([...products, res.data])
    }
// ON CHANGE FOR INPUT
    const onChange= (e:  React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const f = [];
            for (let i = 0; i < e.target.files.length; i++) {
                f.push(e.target.files[i]);
            }
            setFiles(f);
        }
    }

    // const[user,setUser] = useAuth();

    return (
        <>
            <ProductContainer >
                {products.map(p => <div key={p.id} className={"product-card"}><ProductCard
                    children={
                        <>
                            {/*CURD BUTTONS*/}
                           <div className={"crud-buttons-container"}>
                               <AddButton onSubmit={onSubmit} onChange={onChange}/>
                                <button type="button" className="btn  p-1 update-button" onClick={() => {}}>Update</button>
                                <button type="button" className="btn  p-1 remove-button" onClick={() => {
                                }}>delete
                                </button>
                            </div>
                        </> }
                    product={p}/>
                </div>)}
            </ProductContainer>

            <LogoutButton/>


        </>
    )



}
function AddButton({onSubmit,onChange}:{
    onSubmit: (e: React.FormEvent) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}){
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    return(
        <>
            {/*ADD TO CARD BUTTON*/}
            <div className={"details-button-container"}>


                <button type="button" className="btn  p-1 add-button"  onClick={() => {
                }}
                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                   add
                </button>

                <div className="modal fade" id="exampleModal" taria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/*THE FORM*/}
                                <form
                                    // ON SUBMIT FOR THE FORM
                                    onSubmit={onSubmit }>

                                    {/*THE TRIGGER BUTTON */}
                                    <button onClick={() => {
                                        fileInputRef.current?.click();
                                    }}>load data</button>

                                    {/*THE ORIGINAL INPUT */}
                                    <input type={"file"}
                                           ref={fileInputRef}
                                            style={{display: "none"}}
                                        // ON CHANGE FOR INPUT
                                           onChange={onChange}
                                           multiple/>

                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Abschicken</button>
                                        {/*<button type="submit" className="btn btn-primary">Save changes</button>*/}
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                {/*---------------*/}
        </>
    )
}





