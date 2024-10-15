import { BiBuildings, BiLogOut, BiMenu } from 'react-icons/bi'
import { CloseMenu, IconDarkOrLight, Icons, IconsContainer, IconsMenu, IconsRight, MenuContainer, MenuDiv, NavContainer, NavIconMenu, Navigation, NavMenu } from './styles'
import { GrLogout, GrNotification, GrUser } from 'react-icons/gr'
import { useContext, useState } from 'react'
import { IoClose, IoPeopleSharp } from 'react-icons/io5'
import { SupaContext } from '@/Context/context'
import { MdDarkMode, MdDashboard, MdEmojiPeople, MdLightMode, MdLocalShipping } from "react-icons/md";
import logo from '../../Assets/iconLogo.png'
import Image from 'next/image';
import DarkModeToggle from './ToggleMode';
import { useRouter } from 'next/router';

export default function NavBar() {
    const [toggleMenu, setToggleMenu] = useState(false)
    const { ChangePage, handleChangePage, handleChangeTheme, ChangeTheme } = useContext(SupaContext);
    const router = useRouter();

    const handleMenu = () => {
        setToggleMenu(!toggleMenu);
    };

    const toggleChangePage = (page: string) => {
        handleChangePage(page)
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        router.push('/Login'); 
    };
    return (
        <>
            <Navigation>
                <NavContainer>
                    <Icons onClick={handleMenu}>
                        <BiMenu size={30} />
                    </Icons>
                    <IconsRight>
                        <IconDarkOrLight>
                            <DarkModeToggle />
                        </IconDarkOrLight>
                        <Icons>
                            <GrNotification size={25} />
                        </Icons>
                        <Icons><GrLogout onClick={handleLogout} size={25} /></Icons>
                    </IconsRight>
                </NavContainer>
            </Navigation>

            {toggleMenu ?
                <MenuDiv $changeTheme={ChangeTheme}>
                    <NavMenu>
                        <NavIconMenu onClick={() => toggleChangePage('HomePage')}>
                            <Image src={logo} width={80} height={0} alt='Logo'></Image>
                            <span>Condominium Management</span>
                        </NavIconMenu>
                    </NavMenu>
                    <MenuContainer>
                        <IconsContainer>
                            <IconsMenu $isActive={ChangePage === 'HomePage'} onClick={() => toggleChangePage('HomePage')}>
                                <MdDashboard size={30} />
                                <span>Dashboard</span>
                            </IconsMenu>
                            <IconsMenu $isActive={ChangePage === 'Inquilinos'} onClick={() => toggleChangePage('Inquilinos')}>
                                <IoPeopleSharp size={24} />
                                <span>Inquilinos</span>
                            </IconsMenu>
                            <IconsMenu $isActive={ChangePage === 'Visitantes'} onClick={() => toggleChangePage('Visitantes')}>
                                <MdEmojiPeople size={24} />
                                <span>Visitantes</span>
                            </IconsMenu>
                            <IconsMenu $isActive={ChangePage === 'Encomendas'} onClick={() => toggleChangePage('Encomendas')}>
                                <MdLocalShipping size={24} />
                                <span>Encomendas</span>
                            </IconsMenu>
                            <IconsMenu $isActive={ChangePage === 'Apartamentos'} onClick={() => toggleChangePage('Apartamentos')}>
                                <BiBuildings size={24} />
                                <span>Apartamentos</span>
                            </IconsMenu>
                        </IconsContainer>
                    </MenuContainer>
                    <CloseMenu onClick={handleMenu}>
                        <IconsMenu $isActive={ChangePage === ''}>
                            <div>
                                <IoClose size={28} />
                                <span>Fechar</span>
                            </div>
                        </IconsMenu>
                    </CloseMenu>
                </MenuDiv >
                :
                <span></span>
            }
        </>
    )
}
