import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  ScrollView, Modal, TextInput, Switch, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { currentUser as initialUser } from '../data/mockData';
import { User, Gender, Region, Personality } from '../types';

const REGIONS: Region[] = [
  '서울', '경기', '인천', '부산', '대구', '대전',
  '광주', '울산', '세종', '강원', '충북', '충남',
  '전북', '전남', '경북', '경남', '제주',
];

const PERSONALITIES: Personality[] = [
  '활발한', '조용한', '다정한', '츤데레', '애교많은',
  '독립적인', '감성적인', '유머있는', '지적인', '운동좋아하는',
];

export default function ProfileScreen() {
  const [user, setUser] = useState<User>(initialUser);
  const [editing, setEditing] = useState(!user.gender);
  const [draft, setDraft] = useState<User>(user);
  const [showRegionPicker, setShowRegionPicker] = useState(false);

  const togglePersonality = (p: Personality) => {
    setDraft((prev) => ({
      ...prev,
      personalities: prev.personalities.includes(p)
        ? prev.personalities.filter((x) => x !== p)
        : [...prev.personalities, p],
    }));
  };

  const saveProfile = () => {
    if (!draft.gender) return Alert.alert('필수', '성별을 선택해주세요.');
    if (!draft.region) return Alert.alert('필수', '사는 지역을 선택해주세요.');
    if (!draft.height || draft.height < 100 || draft.height > 250)
      return Alert.alert('필수', '올바른 키를 입력해주세요.');
    if (!draft.weight || draft.weight < 30 || draft.weight > 200)
      return Alert.alert('필수', '올바른 몸무게를 입력해주세요.');
    if (draft.personalities.length === 0)
      return Alert.alert('필수', '성향을 하나 이상 선택해주세요.');
    setUser(draft);
    setEditing(false);
  };

  if (editing) {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.headerTitle}>프로필 설정</Text>
          <TouchableOpacity onPress={saveProfile}>
            <Text style={styles.saveBtn}>저장</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>성별 <Text style={styles.required}>*</Text></Text>
          <View style={styles.genderRow}>
            {(['남', '여'] as Gender[]).map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.genderBtn, draft.gender === g && styles.genderBtnActive]}
                onPress={() => setDraft({ ...draft, gender: g })}
              >
                <Text style={[styles.genderBtnText, draft.gender === g && styles.genderBtnTextActive]}>
                  {g === '남' ? '남성' : '여성'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>사는 지역 <Text style={styles.required}>*</Text></Text>
          <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowRegionPicker(true)}>
            <Text style={draft.region ? styles.pickerValue : styles.pickerPlaceholder}>
              {draft.region || '지역 선택'}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>키 (cm) <Text style={styles.required}>*</Text></Text>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>숨기기</Text>
              <Switch
                value={draft.hideHeight}
                onValueChange={(v) => setDraft({ ...draft, hideHeight: v })}
                trackColor={{ true: '#FF4B6E' }}
              />
            </View>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="예) 175"
            placeholderTextColor="#aaa"
            value={draft.height ? String(draft.height) : ''}
            onChangeText={(v) => setDraft({ ...draft, height: parseInt(v) || 0 })}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>몸무게 (kg) <Text style={styles.required}>*</Text></Text>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>숨기기</Text>
              <Switch
                value={draft.hideWeight}
                onValueChange={(v) => setDraft({ ...draft, hideWeight: v })}
                trackColor={{ true: '#FF4B6E' }}
              />
            </View>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="예) 65"
            placeholderTextColor="#aaa"
            value={draft.weight ? String(draft.weight) : ''}
            onChangeText={(v) => setDraft({ ...draft, weight: parseInt(v) || 0 })}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>성향 <Text style={styles.required}>*</Text></Text>
          <Text style={styles.sectionSub}>복수 선택 가능</Text>
          <View style={styles.tagWrap}>
            {PERSONALITIES.map((p) => {
              const selected = draft.personalities.includes(p);
              return (
                <TouchableOpacity
                  key={p}
                  style={[styles.personalityTag, selected && styles.personalityTagActive]}
                  onPress={() => togglePersonality(p)}
                >
                  <Text style={[styles.personalityText, selected && styles.personalityTextActive]}>
                    {p}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ height: 40 }} />

        <Modal visible={showRegionPicker} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>지역 선택</Text>
              <ScrollView>
                {REGIONS.map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={[styles.regionItem, draft.region === r && styles.regionItemActive]}
                    onPress={() => { setDraft({ ...draft, region: r }); setShowRegionPicker(false); }}
                  >
                    <Text style={[styles.regionText, draft.region === r && styles.regionTextActive]}>
                      {r}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>프로필</Text>
        <TouchableOpacity onPress={() => { setDraft(user); setEditing(true); }}>
          <Ionicons name="pencil" size={20} color="#FF4B6E" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.age}>{user.age}세 · {user.gender === '남' ? '남성' : '여성'}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#888" />
          <Text style={styles.location}>{user.region}</Text>
        </View>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>신체 정보</Text>
        <View style={styles.bodyInfoRow}>
          <View style={styles.bodyInfoItem}>
            <Text style={styles.bodyInfoLabel}>키</Text>
            <Text style={styles.bodyInfoValue}>
              {user.hideHeight ? '비공개' : `${user.height}cm`}
            </Text>
          </View>
          <View style={styles.bodyInfoDivider} />
          <View style={styles.bodyInfoItem}>
            <Text style={styles.bodyInfoLabel}>몸무게</Text>
            <Text style={styles.bodyInfoValue}>
              {user.hideWeight ? '비공개' : `${user.weight}kg`}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>성향</Text>
        <View style={styles.tagWrap}>
          {user.personalities.map((p) => (
            <View key={p} style={styles.personalityTagActive}>
              <Text style={styles.personalityTextActive}>{p}</Text>
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
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#fff', paddingTop: 56, paddingBottom: 12, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: '#eee',
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#111' },
  saveBtn: { fontSize: 16, fontWeight: '600', color: '#FF4B6E' },
  profileSection: { backgroundColor: '#fff', alignItems: 'center', paddingVertical: 28, marginTop: 1 },
  avatar: { width: 88, height: 88, borderRadius: 44, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: '700', color: '#111' },
  age: { fontSize: 15, color: '#888', marginTop: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  location: { fontSize: 14, color: '#888' },
  bio: { fontSize: 14, color: '#555', textAlign: 'center', marginTop: 10, paddingHorizontal: 40, lineHeight: 20 },
  section: { backgroundColor: '#fff', marginTop: 10, padding: 16 },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#111', marginBottom: 10 },
  sectionSub: { fontSize: 12, color: '#aaa', marginBottom: 10, marginTop: -6 },
  required: { color: '#FF4B6E' },
  genderRow: { flexDirection: 'row', gap: 12 },
  genderBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, borderWidth: 1.5, borderColor: '#ddd', alignItems: 'center' },
  genderBtnActive: { borderColor: '#FF4B6E', backgroundColor: '#fff0f3' },
  genderBtnText: { fontSize: 15, color: '#888', fontWeight: '500' },
  genderBtnTextActive: { color: '#FF4B6E', fontWeight: '700' },
  pickerBtn: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12,
  },
  pickerValue: { fontSize: 15, color: '#111' },
  pickerPlaceholder: { fontSize: 15, color: '#aaa' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  switchLabel: { fontSize: 13, color: '#888' },
  input: { borderWidth: 1.5, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: '#111' },
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  personalityTag: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1.5, borderColor: '#ddd' },
  personalityTagActive: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: '#FF4B6E', borderWidth: 1.5, borderColor: '#FF4B6E' },
  personalityText: { fontSize: 13, color: '#666' },
  personalityTextActive: { fontSize: 13, color: '#fff', fontWeight: '600' },
  bodyInfoRow: { flexDirection: 'row', backgroundColor: '#fafafa', borderRadius: 12, padding: 16 },
  bodyInfoItem: { flex: 1, alignItems: 'center' },
  bodyInfoDivider: { width: 1, backgroundColor: '#eee' },
  bodyInfoLabel: { fontSize: 12, color: '#aaa', marginBottom: 4 },
  bodyInfoValue: { fontSize: 18, fontWeight: '700', color: '#111' },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  menuText: { fontSize: 15, color: '#333', flex: 1 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '70%' },
  modalTitle: { fontSize: 17, fontWeight: '700', marginBottom: 16, color: '#111' },
  regionItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  regionItemActive: { backgroundColor: '#fff0f3' },
  regionText: { fontSize: 15, color: '#333' },
  regionTextActive: { color: '#FF4B6E', fontWeight: '600' },
});
