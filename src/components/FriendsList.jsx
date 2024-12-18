import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FriendsList = ({ friends }) => {
    return (
        <View style={{ display: 'flex', width: '100%', gap: 10, marginTop: 10 }}>
            {friends?.length > 0 ? friends.map((friend) => (
                <Text key={friend.id}
                    style={{ fontSize: 18, fontWeight: '500' }}
                >
                    {friend.name}</Text>)) : <Text style={{ fontSize: 16, fontWeight: '400' }} >You have no friends</Text>}


        </View>
    )
}

export default FriendsList

const styles = StyleSheet.create({})