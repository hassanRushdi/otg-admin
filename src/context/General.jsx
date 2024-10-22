import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';
export const GeneralData = createContext([])

function General({ children }) {

    const [isLang, setIsLang] = useState(Cookies.get('i18next'));
    const [collapsed, setCollapsed] = useState(false);
    const [visible, setVisible] = useState(false);



    useEffect(() => {
        Cookies.set('i18next', isLang)
    }, [isLang])

 
    return (
        <GeneralData.Provider
            value={{
                isLang,
                setIsLang,
                collapsed,
                setCollapsed,visible, setVisible
            }}>
            {children}
        </GeneralData.Provider>
    )
}

export default General