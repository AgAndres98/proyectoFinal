import { View, Text } from "react-native";
import { Icon, Button } from "react-native-elements";
import { styles } from "./DonationCashCard.styles"


export function DonationCashCard() {
    return (
      <View style={styles.content}>
        <View style={styles.contentAdentro} >
            <Text style={styles.title}>Pesos</Text>
            <Text style={styles.subtitle}>Cuenta Virtual Mercado Libre SRL</Text>
            <Text style={styles.subtitle}>ayuDAR</Text>
            <Text style={styles.titleText}>CVU: <Text style={styles.text}>0000003100014206549863</Text><Icon type="material-community" name="content-copy" style={styles.icon} size={20} color="#62bd60" />
            </Text>
            <Text style={styles.titleText}>Alias: <Text style={styles.text}>ahuma.alfil.ataja.mp</Text><Icon type="material-community" name="content-copy" style={styles.icon} size={20} color="#62bd60" />
            </Text>
            <Button title="¡Doná a través de Mercado Pago!" 
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
            />
        </View>
      </View>
    );
  }