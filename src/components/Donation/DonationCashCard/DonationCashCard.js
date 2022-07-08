import { View, Text, Clipboard, ToastAndroid, Linking } from "react-native";
import { Icon, Button } from "react-native-elements";
import { styles } from "./DonationCashCard.styles";

export function DonationCashCard() {
  const copyToClipboardCBU = () => {
    Clipboard.setString("0000003100014206549863");
    ToastAndroid.show("CVU copiado correctamente", ToastAndroid.SHORT);
  };
  const copyToClipboardAlias = () => {
    Clipboard.setString("ahuma.alfil.ataja.mp");
    ToastAndroid.show("Alias copiado correctamente", ToastAndroid.SHORT);
  };

  const toMercadoPago = () => {
    /*const whatsappNo = "5491133843639";
    Linking.openURL(
      `whatsapp://send?phone=${whatsappNo}&text=${"whatsappMsg"}`
    );*/
    Linking.openURL(`http://mpago.li/2ZmcNgi`);
  };

  return (
    <View style={styles.content}>
      <View style={styles.contentAdentro}>
        <Text style={styles.title}>Pesos</Text>
        <Text style={styles.subtitle}>Cuenta Virtual Mercado Libre SRL</Text>
        <Text style={styles.subtitle}>ayuDAR</Text>
        <View style={styles.viewContainer}>
          <Text style={styles.titleText}>
            CVU: <Text style={styles.text}>0000003100014206549863</Text>
          </Text>
          <Icon
            type="material-community"
            name="content-copy"
            style={styles.icon}
            size={20}
            color="#62bd60"
            onPress={copyToClipboardCBU}
          />
        </View>

        <View style={styles.separador} />

        <View style={styles.viewContainer}>
          <Text style={styles.titleText}>
            Alias: <Text style={styles.text}>ahuma.alfil.ataja.mp</Text>
          </Text>

          <Icon
            type="material-community"
            name="content-copy"
            style={styles.icon}
            size={20}
            color="#62bd60"
            onPress={copyToClipboardAlias}
          />
        </View>

        <View style={styles.separador} />

        <Button
          title="¡Doná a través de Mercado Pago!"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={toMercadoPago}
        />
      </View>
    </View>
  );
}
