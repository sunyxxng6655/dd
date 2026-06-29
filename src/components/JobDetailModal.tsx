import React from 'react';
import {
  Modal, View, Text, StyleSheet, TouchableOpacity,
  Image, ScrollView, Alert,
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
      Alert.alert('이미 채팅 중', '이 글 작성자와 이미 채팅이 진행 중입니다.');
    } else {
      Alert.alert(
        '채팅 보내기',
        `${job.author.name}님에게 채팅을 시작하시겠어요?`,
        [
          { text: '취소', style: 'cancel' },
          {
            text: '채팅 시작',
            onPress: () => { onClose(); Alert.alert('채팅 시작됨', '채팅 탭에서 확인하세요!'); },
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
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{job.author.name} · {job.author.age}세</Text>
                <Text style={styles.authorRegion}>
                  <Ionicons name="location-outline" size={13} /> {job.author.region}
                </Text>
              </View>
            </View>

            <Text style={styles.title}>{job.title}</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>키</Text>
                <Text style={styles.infoValue}>
                  {job.author.hideHeight ? '비공개' : `${job.author.height}cm`}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>몸무게</Text>
                <Text style={styles.infoValue}>
                  {job.author.hideWeight ? '비공개' : `${job.author.weight}kg`}
                </Text>
              </View>
              {(job.minHeight || job.maxHeight) && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>희망 키</Text>
                  <Text style={styles.infoValue}>
                    {job.minHeight ? `${job.minHeight}cm` : ''}{job.minHeight && job.maxHeight ? ' ~ ' : ''}{job.maxHeight ? `${job.maxHeight}cm` : ''}
                  </Text>
                </View>
              )}
              {(job.minWeight || job.maxWeight) && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>희망 몸무게</Text>
                  <Text style={styles.infoValue}>
                    {job.minWeight ? `${job.minWeight}kg` : ''}{job.minWeight && job.maxWeight ? ' ~ ' : ''}{job.maxWeight ? `${job.maxWeight}kg` : ''}
                  </Text>
                </View>
              )}
            </View>

            <Text style={styles.sectionTitle}>소개</Text>
            <Text style={styles.description}>{job.description}</Text>

            <Text style={styles.sectionTitle}>원하는 성향</Text>
            <View style={styles.tags}>
              {job.personalities.map((p, i) => (
                <View key={i} style={styles.tag}><Text style={styles.tagText}>{p}</Text></View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>작성자 성향</Text>
            <View style={styles.tags}>
              {job.author.personalities.map((p, i) => (
                <View key={i} style={[styles.tag, styles.tagAuthor]}>
                  <Text style={styles.tagAuthorText}>{p}</Text>
                </View>
              ))}
            </View>
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
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  container: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, maxHeight: '90%' },
  handle: { width: 40, height: 4, backgroundColor: '#ddd', borderRadius: 2, alignSelf: 'center', marginTop: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 8 },
  closeBtn: { padding: 4 },
  authorSection: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16, padding: 12, backgroundColor: '#fafafa', borderRadius: 12 },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  authorInfo: { flex: 1 },
  authorName: { fontSize: 16, fontWeight: '600', color: '#111' },
  authorRegion: { fontSize: 13, color: '#888', marginTop: 3 },
  title: { fontSize: 20, fontWeight: '700', color: '#111', marginBottom: 14 },
  infoRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20, backgroundColor: '#fafafa', borderRadius: 12, padding: 14 },
  infoItem: { minWidth: '45%' },
  infoLabel: { fontSize: 11, color: '#aaa', marginBottom: 2 },
  infoValue: { fontSize: 15, fontWeight: '600', color: '#111' },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#111', marginBottom: 10 },
  description: { fontSize: 14, color: '#444', lineHeight: 22, marginBottom: 20 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  tag: { backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  tagText: { fontSize: 13, color: '#555' },
  tagAuthor: { backgroundColor: '#fff0f3' },
  tagAuthorText: { fontSize: 13, color: '#FF4B6E', fontWeight: '500' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  contactBtn: { backgroundColor: '#FF4B6E', borderRadius: 12, paddingVertical: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  contactText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
