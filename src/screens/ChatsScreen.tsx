import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { chatRooms as initialRooms } from '../data/mockData';
import { ChatRoom } from '../types';
import ChatRoomScreen from './ChatRoomScreen';

export default function ChatsScreen() {
  const [rooms] = useState<ChatRoom[]>(initialRooms);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);

  if (activeRoom) {
    return (
      <ChatRoomScreen
        room={activeRoom}
        onBack={() => setActiveRoom(null)}
      />
    );
  }

  const renderRoom = ({ item }: { item: ChatRoom }) => (
    <TouchableOpacity style={styles.row} onPress={() => setActiveRoom(item)} activeOpacity={0.7}>
      <Image source={{ uri: item.otherUser.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{item.otherUser.name}</Text>
          <Text style={styles.time}>{item.lastMessage?.createdAt}</Text>
        </View>
        <Text style={styles.jobTitle} numberOfLines={1}>
          📌 {item.jobTitle}
        </Text>
        {item.lastMessage && (
          <Text style={styles.lastMsg} numberOfLines={1}>
            {item.lastMessage.text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>채팅</Text>
      </View>

      {rooms.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>💬</Text>
          <Text style={styles.emptyText}>아직 채팅이 없어요</Text>
          <Text style={styles.emptySubText}>구인글에서 관심 있는 포스팅에 채팅을 보내보세요</Text>
        </View>
      ) : (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id}
          renderItem={renderRoom}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#fff',
    paddingTop: 56,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#111' },
  list: { paddingBottom: 80 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  avatar: { width: 52, height: 52, borderRadius: 26, marginRight: 12 },
  info: { flex: 1 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  name: { fontSize: 16, fontWeight: '600', color: '#111' },
  time: { fontSize: 12, color: '#aaa' },
  jobTitle: { fontSize: 12, color: '#FF4B6E', marginBottom: 3 },
  lastMsg: { fontSize: 14, color: '#777' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  emptyIcon: { fontSize: 48 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#333' },
  emptySubText: { fontSize: 14, color: '#888', textAlign: 'center', paddingHorizontal: 40 },
});
