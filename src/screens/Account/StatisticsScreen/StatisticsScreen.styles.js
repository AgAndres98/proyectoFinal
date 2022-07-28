import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F4F4FC",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F4F4FC",
  },
  btnGroup: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#6B7280",
    borderRadius: 10,
  },
  btn: {
    flex: 1,

    borderColor: "#6B7280",
  },
  btnRight: {
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: "#6B7280",
  },
  btnLeft: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: "#6B7280",
  },
  btnText: {
    textAlign: "center",
    paddingVertical: 16,
    fontSize: 14,
  },
  statisticsContainer: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});
