import React, { useState } from 'react';

export const InputTagApp = ({ items, setItems }) => {
    const addItem = (name) => {
        if (name && !items.includes(name)) {
            setItems(previus => ([...previus, name]));
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addItem(event.target.value);
            event.target.value = '';
        }
    }

    const deleteItem = (name) => {
        let newItems = [...items].filter(x => x !== name);
        setTopics(prev => [...prev, name]);
        setItems(newItems);
    }
    const addTopic = (x) => {
        setTopics(prev => prev.filter(a => a != x));
        setItems(prev => [...prev, x]);
    }
    const [topics, setTopics] = useState(['Operadores matemáticos', 'Condicionales', 'Bucles', 'Funciones', 'Vectores', 'Matrices', 'Estruc', 'POO', 'Pilas', 'Colas', 'Listas', 'Árboles', 'Gráfos', 'Tablas hash'])
    return (
        <>
            <div className="topics">
                {
                    topics.map((x, idx) => (
                        <span onClick={() => addTopic(x)} key={idx}>{x}</span>
                    ))
                }
            </div>
            <div className='input-tag mt-2'>
                {items.map(item => (
                    <div className='item-tag' key={item}>
                        <span>{item}</span>
                        <button onClick={() => deleteItem(item)}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                ))}
                <input
                    type="text"
                    placeholder={items.length > 0 ? '' : 'Matrices, Vectores, Etc.'}
                    onKeyDown={handleKeyDown}
                    className={`${items.length == 0 && 'w-100'}`}
                />
            </div>

        </>
    )
}
