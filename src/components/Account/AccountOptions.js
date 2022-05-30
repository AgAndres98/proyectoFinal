import React, { useState } from "react";
import { View } from "react-native";
import { ListItem, Icon, Text } from "react-native-elements";
import { map } from "lodash";
import { Modal } from "../../components/Shared";
import { ChangeEmailForm } from "./ChangeEmailForm";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { MyObjects } from "./MyObjects/MyObjects";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "./../../utils";

export function AccountOptions(props) {
  const { onReload } = props;
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

    const selectedComponent = (key) => {
        if (key === "email") {
            setRenderComponent(<ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload} />);
            onCloseOpenModal();
        }

        if (key === "password") {
            setRenderComponent(<ChangePasswordForm onClose={onCloseOpenModal} />);
            onCloseOpenModal();
        }

        if (key === "myObjects") {
            navigation.navigate(screen.account.myObjects);
        }

        
    };
    const menuOptions = getMenuOptions(selectedComponent);
  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} bottomDivider onPress={menu.onPress}>
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={menu.iconType}
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}

            <Modal show={showModal} close={onCloseOpenModal}>
                {renderComponent}
            </Modal>
        </View>

      
  )
}

function getMenuOptions(selectedComponent) {
  return [
    {
      title: "Cambiar email",
      iconType: "material-community",
      iconNameRight: "arrow-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameRight: "arrow-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("password"),
    },
    {
      title: "Ver mis publicaciones",
      iconType: "material-community",
      iconNameRight: "arrow-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("myObjects"),
    },
    {
      title: "Editar formulario beneficiario",
      iconType: "material-community",
      iconNameRight: "arrow-right",
      iconColorRight: "#ccc",
      onPress: () => console.log("cambiar contra"),
    },
    {
      title: "Editar formulario donante",
      iconType: "material-community",
      iconNameRight: "arrow-right",
      iconColorRight: "#ccc",
      onPress: () => console.log("cambiar contra"),
    },
  ];
}
