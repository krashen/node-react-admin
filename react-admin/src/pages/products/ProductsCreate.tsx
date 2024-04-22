import { SyntheticEvent, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import Wrapper from '../../components/Wrapper.component'
import ImageUploader from '../../components/ImageUploader.component'


const ProductsCreate = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    
    const [redirectAfter, setRedirectAfter] = useState(false)
    
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        try {
            const response = await axios.post('products',{
                title,
                description,
                image,
                price: parseInt(price)
            })
            console.log(response)
            if (response.status === 201) {
                setRedirectAfter(true)           
            }
        } catch(e) {
            console.log(e)
        }

    }
    
    return (
        <Wrapper>
            {redirectAfter && <Navigate to={'/products'} />}
            <div className='form-signin form-add w-100 m-auto'>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Add Product</h1>

                    <input
                        className="form-control" 
                        placeholder="Title"
                        onChange={e => setTitle(e.target.value)}
                        required 
                    />
                    
                    <textarea
                        className="form-control" 
                        placeholder="Description"
                        onChange={e => setDescription(e.target.value)}
                        required 
                    >
                    </textarea>
                    { (image.length > 0)?
                        <div className="small-image">
                            <img src={image} />
                            <button onClick={(e => setImage(''))}>X</button>
                        </div>
                        
                        :
                        null
                    }
                    <div className="input-group">
                        <input
                            className="form-control" 
                            placeholder="Image URL"
                            value={image}
                            onChange={e => setImage(e.target.value)}
                        />
                        or
                        <ImageUploader uploaded={setImage}/>
                        
                    </div>
                    

                    <input
                        className="form-control" 
                        placeholder="Price"
                        type="number"
                        onChange={e => setPrice(e.target.value)}
                        required 
                    />
                    
                    <button
                        className="btn btn-primary w-100 py-2" type="submit">Add</button>
                    
                </form>
            </div>
        </Wrapper>
    )
}

export default ProductsCreate