import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { RootState } from "@/components/redux/store";
import axios from "axios";
import { getToken } from "@/components/SecureStore/SecureStore";

type PaymentProps = {
  checkedmap: boolean;
  setCheckedmap: React.Dispatch<React.SetStateAction<boolean>>;
  cash: boolean;
  setCash: React.Dispatch<React.SetStateAction<boolean>>;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  activeInstallment: number;
  setActiveInstallment: React.Dispatch<React.SetStateAction<number>>;
};

const Payment: React.FC<PaymentProps> = ({
  checkedmap,
  setCheckedmap,
  cash,
  setCash,
  checked,
  setChecked,
  activeInstallment,
  setActiveInstallment,
}) => {
  const cart = useSelector((state: RootState) => state.shoppingCart);
  const [installments, setInstallments] = useState<any[]>([]);

  const handlePres = () => {
    setChecked(true);
    setCheckedmap(false);
    setCash(false);
  };

  const handlePre = () => {
    setChecked(false);
    setCheckedmap(true);
    setCash(false);
  };

  const handlePr = () => {
    setCheckedmap(false);
    setChecked(false);
    setCash(true);
  };

  const handlePress = (id: number): void => {
    setActiveInstallment(id);
  };

  useEffect(() => {
    const fetchInstallments = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          "https://aist.mobi/order/company/list/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const companyData = response.data;
        if (companyData.length > 0) {
          console.log("Полученные данные:", companyData);
          setInstallments(companyData[0].installment_plan || []);
        } else {
          setInstallments([]);
        }
      } catch (err) {
        console.error("Ошибка при получении данных:", err);
      }
    };

    fetchInstallments();
  }, []);

  const selectedInstallment = installments[activeInstallment] || {};
  const installmentPercentage = selectedInstallment.installment_plan
    ? parseFloat(selectedInstallment.installment_plan)
    : 0;

  const monthlyPayment = installmentPercentage
    ? ((cart.totalPrice * installmentPercentage) / 100).toFixed(2)
    : "0.00";

  const totalWithInterest = (
    cart.totalPrice +
    cart.totalPrice * (installmentPercentage / 100)
  ).toFixed(2);

  return (
    <View>
      <Text style={styles.total}>Способ оплаты</Text>
      <View style={styles.blocks}>
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={handlePres} style={styles.border}>
              <View
                style={{
                  width: checked ? 11 : 0,
                  height: checked ? 11 : 0,
                  backgroundColor: "rgba(55, 9, 238, 1)",
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Купить в рассрочку от Aist Mobi</Text>
              <Image
                style={styles.image}
                source={require("../../assets/images/log.png")}
              />
            </View>
          </View>
          <View style={checked ? styles.block : styles.none}>
            <View style={styles.installmentsContainer}>
              {installments.map((installment, index) => (
                <TouchableOpacity
                  key={installment.id}
                  style={[
                    styles.installment,
                    activeInstallment === index && styles.activeInstallment,
                  ]}
                  onPress={() => handlePress(index)}
                >
                  <Text style={styles.name}>{installment.month} мес</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.paymentInfo}>
              <View>
                <Text style={styles.paiment}>Ежемесячный платеж:</Text>
                <Text style={styles.price}>{monthlyPayment}c</Text>
              </View>
              <View>
                <Text style={styles.paiment}>Итого:</Text>
                <Text style={styles.price}>{totalWithInterest}c</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.blocks}>
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={handlePre} style={styles.border}>
              <View
                style={{
                  width: checkedmap ? 11 : 0,
                  height: checkedmap ? 11 : 0,
                  backgroundColor: "rgba(55, 9, 238, 1)",
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Банковская карта</Text>
            </View>
          </View>
          <View style={checkedmap ? styles.block : styles.none}>
            <View style={styles.installmentsContainer}>
              <View style={styles.cart}>
                <Image
                  style={styles.image}
                  source={require("../../assets/images/Component 2.png")}
                />
                <Text>Добавить банковскую карту</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.blocks}>
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={handlePr} style={styles.border}>
              <View
                style={{
                  width: cash ? 11 : 0,
                  height: cash ? 11 : 0,
                  backgroundColor: "rgba(55, 9, 238, 1)",
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Наличные</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  total: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
  } as TextStyle,
  blocks: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  } as ViewStyle,
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  } as ViewStyle,
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  } as ViewStyle,
  image: {
    width: 24,
    height: 24,
  } as ImageStyle,
  border: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "rgba(55, 9, 238, 1)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  installment: {
    width: 70,
    backgroundColor: "rgba(234, 234, 234, 1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    paddingVertical: 8,
  } as ViewStyle,
  name: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(25, 25, 25, 1)",
  } as TextStyle,
  activeInstallment: {
    backgroundColor: "rgba(55, 9, 238, 0.2)",
    borderColor: "rgba(55, 9, 238, 1)",
    borderWidth: 1,
  } as ViewStyle,
  paiment: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(160, 160, 160, 1)",
  } as TextStyle,
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(25, 25, 25, 1)",
    marginTop: 1,
  } as TextStyle,
  none: {
    display: "none",
  } as ViewStyle,
  block: {
    display: "flex",
  } as ViewStyle,
  installmentsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 15,
  } as ViewStyle,
  paymentInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  } as ViewStyle,
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: " rgba(25, 25, 25, 1)",
  },
  cart: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(55, 9, 238, 1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 50,
  },
});

export default Payment;
