import React, {FC} from 'react';
import {Spin} from "antd";

interface SpinnerProps {
    text?: string,
    size?: "large" | "small" | "default",
    textSize?: number,
    center?: boolean
}

const Spinner: FC<SpinnerProps> = ({
                                       text = '',
                                       size = "default",
                                       textSize = 5,
                                       center = false
                                   }) => {

    const renderSpinner = (text) => {
        if (text !== '' && text !== undefined) {
            return (
                <Spin
                    size={size}
                    tip={
                        <div>
                            <h3 style={{fontSize:`${textSize || 10}px`}}>{text}</h3>
                        </div>
                    }/>
            )
        } else {
            return (
                <Spin
                    size={size}
                />
            )
        }
    }

    return (
        <>
            {center ?
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    {renderSpinner(text)}
                </div>
                :
                renderSpinner(text)
            }
        </>
    );
};

export default Spinner;