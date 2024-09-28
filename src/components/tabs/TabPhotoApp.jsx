import React, { useContext, useState } from 'react'
import axios from 'axios';
import { MainContext } from '../../contexts/MainContextApp';
import { showInfoToast } from '../../utils/showInfoToast';
import { CONFIG } from '../../config';

export const TabPhotoApp = ({ close }) => {
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const { owner, getUser } = useContext(MainContext);
    const [isLoading, setIsLoading] = useState(false);
    const update = () => {
        if (!isLoading) {
            setIsLoading(true);
            const form = new FormData();
            form.append('file', photo);
            axios.put(`${CONFIG.uri}/users/photo/${owner._id}`, form)
                .then(x => {
                    getUser();
                    showInfoToast('Foto actualizada');
                    close();
                })
                .catch(error => {
                    setIsLoading(false);
                    showInfoToast('Error');
                })
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className='tab-profile inter'>
            <div style={{ width: '600px', fontSize: '0.95rem', position: 'relative' }}>
                <i onClick={() => close()}
                    style={{ position: 'absolute', right: 20, cursor: 'pointer' }} className="fa-solid fa-xmark"></i>
                <h5 className='fw-bold'>Subir foto</h5>
                {
                    !photo && (
                        <div className='mt-4'>
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                            <div className='mt-1' style={{ fontSize: '0.9rem' }}>
                                <span>Max files/folder size: 5.00MB</span><br />
                                <span>( image/* are supported)</span>
                            </div>
                        </div>
                    )
                }
                {preview && (
                    <div className='my-4 text-center'>
                        <img src={preview} alt="Image Preview" style={{ width: '200px' }} />
                    </div>
                )}
                {
                    photo && (
                        <div className='text-end'>
                            <button onClick={() => close()} className='me-4 btn-view-challenges' style={{ background: 'white', color: 'black', border: '1px solid black' }}>Cancelar</button>
                            <button className='btn-view-challenges' onClick={() => update()}>
                                {isLoading ? (<span><i className="fa-solid fa-spinner icon-load me-2"></i>Subiendo</span>) : 'Subir'}
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
