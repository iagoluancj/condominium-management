import React, { useContext, useState } from 'react';
import {
    CheckboxContainer, Checkbox, CheckboxLabel,
    Ball
} from './styles'; // Altere o caminho conforme necessário
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { SupaContext } from '@/Context/context';

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);
    const { handleChangeTheme } = useContext(SupaContext);

    const toggleChangeTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        handleChangeTheme(newTheme);
    };

    return (
        <CheckboxContainer>
            <Checkbox
                id="checkbox"
                type="checkbox"
                onChange={toggleChangeTheme}
                checked={isDark}
            />
            <CheckboxLabel isDark={isDark} htmlFor="checkbox">
                <MdLightMode />
                <MdDarkMode />
                <Ball isDark={isDark} />
            </CheckboxLabel>
        </CheckboxContainer>
    );
};

export default DarkModeToggle;
