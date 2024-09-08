import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

export const ChatApp = ({ socket, owner, codeRoom }) => {
    const { register, handleSubmit } = useForm();
    const [messages, setMessages] = useState([]);
    const sendMessage = (data) => {
        socket.emit('send_message', { name: owner.username, content: data.message })
    }
    useEffect(() => {
        socket.on('recive_message', data => {
            setMessages(prev => [...prev, data]);
        })
        return () => {
            socket.off('recive_message');
        }
    }, [])
    return (
        <div className="card-chat" >
            <div style={{ height: '380px', overflowY: 'auto' }}>
                <div className='mt-3 px-2'>
                    {
                        messages.map((x, idx) => (
                            <div key={idx}>
                                <span style={{ color: '#87D2D3' }} className='fw-bold'>{x.name}:</span>
                                <span className='ms-2' style={{ color: 'white' }}>{x.content}</span>
                            </div>
                        ))
                    }
                    {
                        messages.length == 0 && (<span style={{ color: '#87D2D3' }}>No hay mensajes recientemente</span>)
                    }
                </div>
            </div>
            <form className='inp-chat' onSubmit={handleSubmit(sendMessage)}>
                <div style={{ color: '#87D2D3' }}>(Sala):</div>
                <input type="text"{...register('message', { required: 'true' })} />
            </form>
        </div>
    )
}
