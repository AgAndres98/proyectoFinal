import React, { useState } from "react";
import { View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { screen } from "./../../utils";
import { Modal } from "../../components/Shared";
import { ChangeEmailForm } from "./ChangeEmailForm";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { Estadistica } from "../Estadistica";


export function AccountOptions(props) {

  const { onReload } = props;
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const auth = getAuth();

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const selectedComponent = (key) => {
    if (key === "email") {
      setRenderComponent(
        <ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload} />
      );
      onCloseOpenModal();
    }

    if (key === "password") {
      setRenderComponent(<ChangePasswordForm onClose={onCloseOpenModal} />);
      onCloseOpenModal();
    }

    if (key === "myObjects") {
      navigation.navigate(screen.account.myObjects);
    }

    if (key === "myEvents") {
      navigation.navigate(screen.account.myEvents);
    }

    if (key === "editDonnor") {
      navigation.navigate(screen.account.editDonnor);
    }

    if (key === "editBeneficiary") {
      navigation.navigate(screen.account.editBeneficiary);
    }
    if (key === "estadisticas") {
      navigation.navigate(screen.account.Estadistica);
    }
  };

  let menuOptions = getMenuOptions(selectedComponent);

  if (auth.currentUser.email == "exporeact.ayudar@gmail.com") {
    menuOptions = getMenuOptionsAdmin(selectedComponent);
  }
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
  );
}

function getMenuOptions(selectedComponent) {
  return [
    {
      title: "Cambiar email",
      iconType: "material-community",
      iconNameRight: "arrow-right",
      iconColorRight: "#62bd60",
      onPress: () => selectedComponent("email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameRight: "arrow-right",
      iconColorRight: "#62bd60",
      onPress: () => selectedComponent("password"),
    },
    {
      title: "Ver mis publicaciones",
      iconType: "material-community",
      iconNameRight: "arrow-right",
      iconColorRight: "#62bd60",
      onPress: () => selectedComponent("myObjects"),
    },
    {
      title: "Editar formulario beneficiario",
      iconType: "material-community",
      iconNameRight: "arrow-right",
      iconColorRight: "#62bd60",
      onPress: () => selectedComponent("editBeneficiary"),
    },
    {
      title: "Editar formulario donante",
      iconType: "material-community",
      iconNameRight: "arrow-right",
      iconColorRight: "#62bd60",
      onPress: () => selectedComponent("editDonnor"),
    },
    {
      title: "Ver estadisticas",
      iconType: "material-community",
      iconNameRight: "arrow-right",
      iconColorRight: "#62bd60",
      onPress: () => selectedComponent("estadisticas"),
    },
  ];
}
function getMenuOptionsAdmin(selectedComponent) {
  return [
    {
      title: "Cambiar email",
      iconType: "material-community",
      iconNameRight: "arrow-right",
      iconColorRight: "#62bd60",
      onPress: () => selectedComponent("email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameRight: "arrow-right",
      iconColorRight: "#62bd60",
      onPress: () => selectedComponent("password"),
    },
    {
      title: "Mis eventos",
      iconType: "material-community",
      iconNameRight: "arrow-right",
      iconColorRight: "#62bd60",
      onPress: () => selectedComponent("myEvents"),
    },
  ];
}
