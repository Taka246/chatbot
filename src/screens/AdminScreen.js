import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import BottomBar from '../components/Interface';


const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync : {
  },
});

class AdminScreen extends React.Component {
  state = {
    name: '',
    password: '',
    url: 'https://facebook.github.io/react-native/img/header_logo.png',
    nameList: '',
    urlList: '',
    del_user: '',
  }

  Registar() {
    const userInfomation = {
      name: this.state.name,
      password: this.state.password,
      url: this.state.url,
    };
    storage.save({
      key: this.state.name,
      id: this.state.password,
      data: userInfomation,
    })
      .then(() => {
        this.setState({
          nameList: this.state.name,
          urlList: this.state.url,
        });
        // this.props.navigation.navigate('Admin');
        this.setState({
          name: '',
          password: '',
          url: '',
        });
      });
    // storage.load({
    //   key: 'user',
    //   id: '1001',
    // })
    //   .then((ret) => {
    //     console.log(ret);
    //   });
  }
  //   // getIdsForKey
  // storage.getIdsForKey('user').then(ids => {
  //     console.log(ids);
  // });
  //
  Delete() {
    storage.clearMapForKey(this.state.del_user);
    this.props.navigation.navigate('Admin');
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contents}>
          <TextInput
            style={styles.input}
            value={this.state.name}
            onChangeText={(text) => { this.setState({ name: text }); }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="ユーザ名 ( 2 ~ 20文字 )"
          />
          <TextInput
            style={styles.input}
            value={this.state.password}
            onChangeText={(text) => { this.setState({ password: text }); }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="パスワード ( 4 ~ 20文字 )"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            value={this.state.url}
            onChangeText={(text) => { this.setState({ url: text }); }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="表示画像URL ( 8 ~ 250文字 )"
          />
          <TouchableHighlight style={styles.button} onPress={this.Registar.bind(this)} underlayColor="skyblue">
            <Text style={styles.buttonTitle}>登録</Text>
          </TouchableHighlight>
          <View style={styles.users}>
            <Text style={styles.usersTitle}>ユーザ一覧</Text>

            <View style={styles.User}>
              <View style={styles.picture}>
                <Image
                  source={{ uri: this.state.urlList }}
                  style={{ width: 50, height: 50, backgroundColor: 'aqua' }}
                  // source={require('./water.png')}
                />
                <Text style={styles.pictureText}>pic</Text>
              </View>
              <View style={styles.name}>
                <Text style={styles.nameText}>{this.state.nameList}</Text>
              </View>
              <View style={styles.date}>
                <Text style={styles.dateText}>2018/01/01</Text>
              </View>
              <View style={styles.delete}>
                <TouchableHighlight style={styles.deleteButton} onPress={this.Delete.bind(this)} underlayColor="skyblue">
                  <Text style={styles.deleteButtonTitle}>削除</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
        <BottomBar navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  contents: {
    padding: 48,
  },
  input: {
    height: 48,
    marginTop: 24,
    borderBottomWidth: 3,
    borderColor: '#AAA',
    padding: 8,
    fontSize: 18,
  },
  button: {
    backgroundColor: 'skyblue',
    height: 48,
    marginTop: 36,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
  users: {
    height: 216,
    marginTop: 36,
    width: '100%',
  },
  usersTitle: {
    fontSize: 18,
  },
  User: {
    height: 72,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  picture: {
    height: '80%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    height: '100%',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    height: '100%',
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delete: {
    height: '100%',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    height: '50%',
    width: '80%',
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
    marginLeft: 8,
  },
});

export default AdminScreen;
