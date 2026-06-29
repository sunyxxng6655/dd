import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { posts as initialPosts, currentUser } from '../data/mockData';
import { Post } from '../types';

export default function CommunityScreen() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPostText, setNewPostText] = useState('');

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const submitPost = () => {
    if (!newPostText.trim()) return;
    const newPost: Post = {
      id: `p${Date.now()}`,
      author: currentUser,
      content: newPostText.trim(),
      createdAt: '방금 전',
      likes: 0,
      comments: 0,
      liked: false,
    };
    setPosts([newPost, ...posts]);
    setNewPostText('');
    setModalVisible(false);
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{item.author.name}</Text>
          <Text style={styles.meta}>{item.author.location} · {item.createdAt}</Text>
        </View>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => toggleLike(item.id)}>
          <Ionicons
            name={item.liked ? 'heart' : 'heart-outline'}
            size={20}
            color={item.liked ? '#FF4B6E' : '#888'}
          />
          <Text style={[styles.actionText, item.liked && { color: '#FF4B6E' }]}>
            {item.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="chatbubble-outline" size={20} color="#888" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="share-outline" size={20} color="#888" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>커뮤니티</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>취소</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>새 게시글</Text>
              <TouchableOpacity onPress={submitPost}>
                <Text style={[styles.postBtn, !newPostText.trim() && styles.postBtnDisabled]}>
                  올리기
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.composeRow}>
              <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
              <TextInput
                style={styles.textInput}
                placeholder="지금 어떤 생각을 하고 있나요?"
                placeholderTextColor="#aaa"
                multiline
                autoFocus
                value={newPostText}
                onChangeText={setNewPostText}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
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
  card: {
    backgroundColor: '#fff',
    marginTop: 8,
    padding: 16,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 42, height: 42, borderRadius: 21, marginRight: 10 },
  authorInfo: { flex: 1 },
  authorName: { fontSize: 15, fontWeight: '600', color: '#111' },
  meta: { fontSize: 12, color: '#888', marginTop: 2 },
  content: { fontSize: 15, color: '#333', lineHeight: 22 },
  actions: { flexDirection: 'row', marginTop: 14, gap: 20 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionText: { fontSize: 14, color: '#888' },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF4B6E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    minHeight: 250,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cancelText: { fontSize: 15, color: '#888' },
  modalTitle: { fontSize: 16, fontWeight: '600' },
  postBtn: { fontSize: 15, fontWeight: '600', color: '#FF4B6E' },
  postBtnDisabled: { color: '#ccc' },
  composeRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#111',
    lineHeight: 22,
    maxHeight: 200,
    textAlignVertical: 'top',
  },
});
