import React from 'react';

interface TextContent {
    title: string;
    description: string;
}

export function TextContentComponent(props: TextContent) {
    return (
        <div>
            <h4>{props.title}</h4>
            <p>{props.description}</p>
        </div>
    );
}
