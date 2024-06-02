import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
import React from 'react';

const CardMenu: React.FC = () => {
    const router = useRouter();

    const handleContinue = () => {
        router.push('/grade-analysis');
    };
    const handleContinue2 = () => {
        router.push('/nba');
    };
    const handleContinue3 = () => {
        router.push('/dashboard');
    }
    return (
        <>
            <style jsx>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');

            *{
                font-family: 'Poppins', sans-serif;
                margin:0; padding:0;
                box-sizing: border-box;
                outline: none; border:none;
                text-decoration: none;
                text-transform: capitalize;
                transition: .2s linear;
            }
            
            .container{
                padding:15px 9%;
                padding-bottom: 100px;
            }
            
            .container .heading{
                text-align: center;
                padding-bottom: 15px;
                color:#fff;
                text-shadow: 0 5px 10px rgba(0,0,0,.2);
                font-size: 50px;
                font-weight: 700;
            }
            
            .container .box-container{
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
                gap:15px;
            }
            
            .container .box-container .box{
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                text-align: center;
                padding:30px 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .container .box-container .box img{
                height: 120px;
                margin-bottom: 15px;
            }
            
            .container .box-container .box h3{
                color:#fff;
                font-size: 24px;
                padding:10px 0;
                font-weight: 600;
            }
            
            .container .box-container .box p{
                color:#fff;
                font-size: 16px;
                line-height: 1.8;
                font-weight: 500;
            }
            
            .container .box-container .box .btn{
                margin-top: 10px;
                display: inline-block;
                background:#333;
                color:#fff;
                font-size: 17px;
                border-radius: 5px;
                padding: 8px 25px;
                font-weight: 600;
            }
            
            .container .box-container .box .btn:hover{
                letter-spacing: 1px;
            }
            
            .container .box-container .box:hover{
                background: rgba(255, 255, 255, 0.25);
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            @media (max-width:768px){
                .container{
                    padding:20px;
                }
            } 
            `}</style>

            <div className="container">
                <div className="box-container">
                    <div className="box">
                        <img src="image/icon0.png" alt="" />
                        <h3>Students Gradebook</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                        <Button className="btn" onClick={handleContinue3}>Click Here</Button>
                    </div>

                    <div className="box">
                        <img src="image/icon7.jpg" alt="" />
                        <h3>Grade Analysis</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                        <Button className="btn" onClick={handleContinue}>Click Here</Button>
                    </div>

                    <div className="box">
                    <img src="image/icon8.png" alt="" style={{ width: '150px', height: '150px' }} />

                        <h3>Batchwise Analysis</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                        <Button className="btn" onClick={handleContinue2}>Click Here</Button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default CardMenu;
