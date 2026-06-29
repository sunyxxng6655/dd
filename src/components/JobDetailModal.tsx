import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { JobPosting } from '../types';
import { chatRooms } from '../data/mockData';

interface Props {
  job: JobPosting;
  onClose: () => void;
}

export default function JobDetailModal({ job, onClose }: Props) {
  const handleContact = () => {
    const existing = chatRooms.find((r) => r.jobPostingId === job.id);
    if (existing) {
      Alert.alert('이미 채팅 중', '이 구인글 작성자와 이미 채팅이 진행 중입니다.');
    } else {
      Alert.alert(
        '채팅 보내기',
        `${job.author.name}님에게 채팅을 시작하시겠어요?`,
        [
          { text: '취소', style: 'cancel' },
          {
            text: '채팅 시작',
            onPress: () => {
              onClose();
              Alert.alert('채팅 시작됨', '채팅 탭에서 확인하세요!');
            },
          },
        ]
      );
    }
  };

  return (
    <Modal visible animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.handle} />

          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.authorSection}>
              <Image source={{ uri: job.author.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.authorName}>{job.author.name}</Text>
                <Text style={styles.authorBio}>{job.author.bio}</Text>
              </View>
            </View>

            <Text style={styles.title}>{job.title}</Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="location-outline" size={15} color="#888" />
                <Text style={styles.metaText}>{job.location}</Text>
              </View>
              {job.salary && (
                <View style={styles.metaItem}>
                  <Ionicons name="cash-outline" size={15} color="#888" />
                  <Text style={styles.metaText}>{job.salary}</Text>
                </View>
              )}
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={15} color="#888" />
                <Text style={styles.metaText}>{job.createdAt}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>상세 설명</Text>
            <Text style={styles.description}>{job.description}</Text>

            <Text style={styles.sectionTitle}>요구 사항</Text>
            {job.requirements.map((req, i) => (
              <View key={i} style={styles.reqItem}>
                <Ionicons name="checkmark-circle" size={16} color="#FF4B6E" />
                <Text style={styles.reqText}>{req}</Text>
              </View>
            ))}

            <View style={{ height: 100 }} />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.contactBtn} onPress={handleContact}>
              <Ionicons name="chatbubble" size={18} color="#fff" />
              <Text style={styles.contactText}>채팅 보내기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    maxHeight: '90%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 8 },
  closeBtn: { padding: 4 },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 12,
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  authorName: { fontSize: 15, fontWeight: '600', color: '#111' },
  authorBio: { fontSize: 13, color: '#666', marginTop: 2, maxWidth: 240 },
  title: { fontSize: 20, fontWeight: '700', color: '#111', marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 16, marginBottom: 20, flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 13, color: '#666' },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#111', marginBottom: 8 },
  description: { fontSize: 14, color: '#444', lineHeight: 22, marginBottom: 20 },
  reqItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  reqText: { fontSize: 14, color: '#444', flex: 1 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  contactBtn: {
    backgroundColor: '#FF4B6E',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  contactText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
