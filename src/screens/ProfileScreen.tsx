import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { currentUser } from '../data/mockData';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>프로필</Text>
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{currentUser.name}</Text>
        <Text style={styles.age}>{currentUser.age}세</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#888" />
          <Text style={styles.location}>{currentUser.location}</Text>
        </View>
        <Text style={styles.bio}>{currentUser.bio}</Text>

        <TouchableOpacity style={styles.editBtn}>
          <Ionicons name="pencil" size={15} color="#FF4B6E" />
          <Text style={styles.editBtnText}>프로필 수정</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>보유 스킬</Text>
        <View style={styles.skills}>
          {currentUser.skills?.map((skill, i) => (
            <View key={i} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>설정</Text>
        {[
          { icon: 'notifications-outline', label: '알림 설정' },
          { icon: 'lock-closed-outline', label: '개인정보 보호' },
          { icon: 'help-circle-outline', label: '도움말' },
          { icon: 'log-out-outline', label: '로그아웃' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.menuItem}>
            <Ionicons name={item.icon as any} size={22} color="#555" />
            <Text style={styles.menuText}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color="#ccc" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
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
  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 28,
    marginTop: 1,
  },
  avatar: { width: 88, height: 88, borderRadius: 44, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: '700', color: '#111' },
  age: { fontSize: 15, color: '#888', marginTop: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  location: { fontSize: 14, color: '#888' },
  bio: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: '#FF4B6E',
    borderRadius: 20,
  },
  editBtnText: { color: '#FF4B6E', fontWeight: '600', fontSize: 14 },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 16,
  },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#111', marginBottom: 12 },
  skills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillTag: {
    backgroundColor: '#fff0f3',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ffccd5',
  },
  skillText: { color: '#FF4B6E', fontSize: 13, fontWeight: '500' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuText: { fontSize: 15, color: '#333', flex: 1 },
});
