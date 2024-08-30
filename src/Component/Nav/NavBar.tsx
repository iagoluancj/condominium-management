import { BiHome, BiMenu, BiNotification } from 'react-icons/bi'
import { CloseMenu, Icons, IconsContainer, IconsMenu, IconsRight, MenuContainer, MenuDiv, NavContainer, NavIconMenu, Navigation, NavMenu } from './styles'
import { GrNotification, GrUser } from 'react-icons/gr'
import { GiProtectionGlasses } from 'react-icons/gi'
import { FiEdit } from 'react-icons/fi'
import { useContext, useState } from 'react'
import { IoClose, IoPeopleSharp } from 'react-icons/io5'
import { SupaContext } from '@/Context/context'
import { MdEmojiPeople } from "react-icons/md";


export default function NavBar() {
    const [toggleMenu, setToggleMenu] = useState(false)
    const { handleChangePage } = useContext(SupaContext);

    const handleMenu = () => {
        setToggleMenu(!toggleMenu);
    };

    const toggleChangePage = (page: string) => {
        if (page === 'home') {
            handleChangePage(!true)
        } else if (page === 'inquilinos') {
            handleChangePage(!false)
        }
    };


    return (
        <>
            <Navigation>
                <NavContainer>
                    <Icons onClick={handleMenu}>
                        <BiMenu size={30} />
                    </Icons>
                    <IconsRight>
                        <Icons><GrNotification size={25} /></Icons>
                        <Icons><GrUser size={25} /></Icons>
                    </IconsRight>
                </NavContainer>
            </Navigation>

            {toggleMenu ?
                <MenuDiv>
                    <NavMenu>
                        <NavIconMenu>
                            <GiProtectionGlasses size={70} />
                            <span>Condominium Management</span>
                        </NavIconMenu>
                    </NavMenu>
                    <MenuContainer>
                        <IconsContainer>
                            <IconsMenu onClick={() => toggleChangePage('home')}>
                                <BiHome size={30} />
                                <span>Home</span>
                            </IconsMenu>
                            <IconsMenu onClick={() => toggleChangePage('inquilinos')}>
                                <FiEdit size={24} />
                                <span>Inquilinos</span>
                            </IconsMenu>
                            <IconsMenu onClick={() => toggleChangePage('inquilinos')}>
                                <IoPeopleSharp size={24} />
                                <span>Moradores</span>
                            </IconsMenu>
                            <IconsMenu onClick={() => toggleChangePage('inquilinos')}>
                                <MdEmojiPeople  size={24} />
                                <span>Visitantes</span>
                            </IconsMenu>
                        </IconsContainer>
                    </MenuContainer>
                    <CloseMenu onClick={handleMenu}>
                        <IconsMenu>
                            <div>
                                <IoClose size={28} />
                                <span>Fechar</span>
                            </div>
                        </IconsMenu>
                    </CloseMenu>
                </MenuDiv>
                :
                <span></span>
            }
        </>
    )
}
