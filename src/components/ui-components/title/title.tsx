import React, { useEffect,useState } from 'react'

export interface TitleProps{
    title : string
}
function Title({title} : TitleProps) {
    const [_title,setTitle] = useState('')
    
    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {
        setTitle(capitalizeFirstLetter(title))
    }, [title])

    return (
        <span style={{marginRight: '5px', fontWeight : 600}}>
            {_title}: 
        </span>
    )
}

export default Title
