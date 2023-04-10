import React from "react";

type ButtonProps = {
    text: string;
    imageUrl: string;
    clickHandler(): void;
}

export default class Button extends React.Component<ButtonProps> {
    render() {
        return (
            <button onClick={this.props.clickHandler}>
                <img height="30px" width="30px" src={this.props.imageUrl} alt={this.props.text}/>
                {this.props.text}
            </button>
        )
    }
}