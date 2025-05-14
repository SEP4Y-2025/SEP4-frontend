import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex } from "../../Styles/Flex";
import { Button } from "../../Styles/Button.style";
import { Title } from "../../Styles/Title.style";
import { Label } from "../../Styles/Label.style";
import { InfoBlock, Value } from "../../Styles/Profile.style";
import { useAuth } from "../../contexts/UserAuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
    const { logout } = useAuth();

    const [user, setUser] = useState<{ userName: string; email: string }>({
        userName: "",
        email: "",
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser({
                userName: parsedUser.userName || "Unknown",
                email: parsedUser.email || "Unknown",
            });
        }
    }, []);

    return (
        <Flex $justifyC="center">
            <Flex $dir="column" $alignI="center" $width="320px">
                <Title $margin="2rem 0 0 0">Profile</Title>

                <InfoBlock>
                    <Label $fontWeight="600">Username</Label>
                    <Value>{user.userName}</Value>
                </InfoBlock>

                <InfoBlock>
                    <Label $fontWeight="600">Email</Label>
                    <Value>{user.email}</Value>
                </InfoBlock>

                <Flex $dir="column" $margin="20px 0" $width="100%">
                    <Button $margin="0 0 10px 0">Edit Profile</Button>
                    <Button onClick={logout} $margin="0 0 10px 0">Log Out</Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ProfilePage;
