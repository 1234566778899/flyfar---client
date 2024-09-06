import React from 'react'

export const ResumeApp = () => {
    return (
        <div style={{ fontSize: '0.9rem' }}>
            <div className="container">
                <h4 className='text-center'>Top performers</h4>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className='avatar'></div>
                        <span className='fw-bold'>Alice</span>
                        <span>95 points</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className='avatar'></div>
                        <span className='fw-bold'>Alice</span>
                        <span>95 points</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className='avatar'></div>
                        <span className='fw-bold'>Alice</span>
                        <span>95 points</span>
                    </div>
                </div>
                <br />
                <h3>Ledearboard</h3>
                <table className='table mt-3'>
                    <tbody>
                        <tr>
                            <td>Rank</td>
                            <td>Name</td>
                            <td>Score</td>
                            <td>Time</td>
                            <td>Acurrancy</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Carlos</td>
                            <td>95</td>
                            <td>00:45:00</td>
                            <td>98%</td>
                            <td><i className="fa-solid fa-angle-down"></i></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Huber</td>
                            <td>95</td>
                            <td>00:45:00</td>
                            <td>98%</td>
                            <td><i className="fa-solid fa-angle-down"></i></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Pedro</td>
                            <td>95</td>
                            <td>00:45:00</td>
                            <td>98%</td>
                            <td><i className="fa-solid fa-angle-down"></i></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Marcos</td>
                            <td>95</td>
                            <td>00:45:00</td>
                            <td>98%</td>
                            <td><i className="fa-solid fa-angle-down"></i></td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Pedrito</td>
                            <td>95</td>
                            <td>00:45:00</td>
                            <td>98%</td>
                            <td><i className="fa-solid fa-angle-down"></i></td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Jair</td>
                            <td>95</td>
                            <td>00:45:00</td>
                            <td>98%</td>
                            <td><i className="fa-solid fa-angle-down"></i></td>
                        </tr>

                    </tbody>
                </table>
                <div className="mt-3">
                    <h3>Your performans</h3>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div className='room-item mt-3 w-100'>
                            <h4>Overall Score</h4>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>85</span>
                            <div className='bar-box' style={{ background: '#F4F4F5', height: '10px', width: '300px', borderRadius: '10px' }}>
                                <div style={{ background: '#000', marginTop: '2px', borderRadius: '10px', height: '10px', width: '20%' }} className="progress-box"></div>
                            </div>
                        </div>
                        <div className='room-item mt-3 w-100'>
                            <h4>Time taken</h4>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>85</span>
                            <div className='bar-box' style={{ background: '#F4F4F5', height: '10px', width: '300px', borderRadius: '10px' }}>
                                <div style={{ background: '#000', marginTop: '2px', borderRadius: '10px', height: '10px', width: '20%' }} className="progress-box"></div>
                            </div>
                        </div>
                        <div className='room-item mt-3 w-100'>
                            <h4>Acurracy</h4>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>85</span>
                            <div className='bar-box' style={{ background: '#F4F4F5', height: '10px', width: '300px', borderRadius: '10px' }}>
                                <div style={{ background: '#000', marginTop: '2px', borderRadius: '10px', height: '10px', width: '20%' }} className="progress-box"></div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <div >
                            <button className='btn-view'>View challenge details</button>
                            <button className='btn-try ms-3'>Try another challenge</button>
                        </div>
                        <button className='btn-try'>Compartir tus resultados<i className="fa-solid fa-share-nodes ms-2"></i></button>
                    </div>
                </div>
            </div>
            <br />
            <br />
        </div>
    )
}
