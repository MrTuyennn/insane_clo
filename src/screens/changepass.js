import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper';
import theme from '../utils/theme';
import ButtonCustom from '../components/ButtonCustom';

const changepass = () => {
    return (
        <View style={styles.container}>
            <View style={styles.Viewinput}>
                <TextInput
                    mode="outlined"
                    label="Nhập mật khẩu hiện tại"
                    theme={theming}
                    placeholder="Nhập mật khẩu hiện tại ..."
                />
            </View>
            <View style={styles.Viewinput}>
                <TextInput
                    mode="outlined"
                    label="Nhập mật khẩu mới"
                    theme={theming}
                    placeholder="Nhập mật khẩu mới ..."
                />
            </View>
            <View style={styles.Viewinput}>
                <TextInput
                    mode="outlined"
                    label="Xác nhận lại mật khẩu"
                    theme={theming}
                    placeholder="Xác nhận lại mật khẩu ..."
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <ButtonCustom
                    color={{ color: 'white', fontSize: 20 }}
                    style={styles.button}
                    title="Cập nhập"></ButtonCustom>
                <ButtonCustom
                    color={{ color: 'white', fontSize: 20 }}
                    style={styles.button}
                    title="Hủy"></ButtonCustom>
            </View>
        </View>
    )
}

export default changepass

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    Viewinput: {
        marginHorizontal: 20,
        marginVertical: 15,
    },
    button: {
        marginHorizontal: 10,
        height: 50,
        width: 200,
        borderRadius: 10,
    },
})
const theming = {
    colors: {
        primary: theme.COLOR_PRIMARY,
    },
};