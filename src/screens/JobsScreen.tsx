import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  Image, Modal, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { jobPostings } from '../data/mockData';
import { JobPosting, JobFilter, Gender, Region, Personality } from '../types';
import JobDetailModal from '../components/JobDetailModal';

const REGIONS: Region[] = [
  '서울', '경기', '인천', '부산', '대구', '대전',
  '광주', '울산', '세종', '강원', '충북', '충남',
  '전북', '전남', '경북', '경남', '제주',
];

const PERSONALITIES: Personality[] = [
  '활발한', '조용한', '다정한', '츤데레', '애교많은',
  '독립적인', '감성적인', '유머있는', '지적인', '운동좋아하는',
];

const HEIGHT_OPTIONS = [
  { label: '전체', min: undefined, max: undefined },
  { label: '~159cm', min: undefined, max: 159 },
  { label: '160~169cm', min: 160, max: 169 },
  { label: '170~179cm', min: 170, max: 179 },
  { label: '180cm~', min: 180, max: undefined },
];

const WEIGHT_OPTIONS = [
  { label: '전체', min: undefined, max: undefined },
  { label: '~49kg', min: undefined, max: 49 },
  { label: '50~59kg', min: 50, max: 59 },
  { label: '60~69kg', min: 60, max: 69 },
  { label: '70kg~', min: 70, max: undefined },
];

const defaultFilter = (gender: Gender): JobFilter => ({
  targetGender: gender,
  personalities: [],
});

export default function JobsScreen() {
  const [activeGender, setActiveGender] = useState<Gender>('여');
  const [filter, setFilter] = useState<JobFilter>(defaultFilter('여'));
  const [showFilter, setShowFilter] = useState(false);
  const [draftFilter, setDraftFilter] = useState<JobFilter>(defaultFilter('여'));
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  const openFilter = () => { setDraftFilter(filter); setShowFilter(true); };
  const applyFilter = () => { setFilter(draftFilter); setShowFilter(false); };
  const resetFilter = () => {
    const f = defaultFilter(activeGender);
    setDraftFilter(f); setFilter(f); setShowFilter(false);
  };
  const switchGender = (g: Gender) => {
    setActiveGender(g);
    const f = defaultFilter(g);
    setFilter(f);
  };
  const togglePersonality = (p: Personality) => {
    setDraftFilter((prev) => ({
      ...prev,
      personalities: prev.personalities.includes(p)
        ? prev.personalities.filter((x) => x !== p)
        : [...prev.personalities, p],
    }));
  };

  const filtered = useMemo(() => {
    return jobPostings.filter((job) => {
      if (job.targetGender !== filter.targetGender) return false;
      if (filter.region && job.region !== filter.region) return false;
      if (filter.minHeight !== undefined && (job.maxHeight === undefined || job.maxHeight < filter.minHeight)) return false;
      if (filter.maxHeight !== undefined && (job.minHeight === undefined || job.minHeight > filter.maxHeight)) return false;
      if (filter.minWeight !== undefined && (job.maxWeight === undefined || job.maxWeight < filter.minWeight)) return false;
      if (filter.maxWeight !== undefined && (job.minWeight === undefined || job.minWeight > filter.maxWeight)) return false;
      if (filter.personalities.length > 0) {
        if (!filter.personalities.some((p) => job.personalities.includes(p))) return false;
      }
      return true;
    });
  }, [filter]);

  const activeFilterCount = [
    filter.region,
    filter.minHeight !== undefined || filter.maxHeight !== undefined,
    filter.minWeight !== undefined || filter.maxWeight !== undefined,
    filter.personalities.length > 0,
  ].filter(Boolean).length;

  const renderJob = ({ item }: { item: JobPosting }) => (
    <TouchableOpacity style={styles.card} onPress={() => setSelectedJob(item)} activeOpacity={0.8}>
      <View style={styles.cardTop}>
        <View style={styles.regionBadge}>
          <Ionicons name="location-outline" size={12} color="#FF4B6E" />
          <Text style={styles.regionText}>{item.region}</Text>
        </View>
        <Text style={styles.date}>{item.createdAt}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      <View style={styles.tags}>
        {item.personalities.map((p, i) => (
          <View key={i} style={styles.tag}>
            <Text style={styles.tagText}>{p}</Text>
          </View>
        ))}
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.authorRow}>
          <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
          <Text style={styles.authorName}>{item.author.name} · {item.author.age}세</Text>
        </View>
        <View style={styles.bodyBadge}>
          {!item.author.hideHeight && <Text style={styles.bodyText}>{item.author.height}cm</Text>}
          {!item.author.hideHeight && !item.author.hideWeight && <Text style={styles.bodyDot}>·</Text>}
          {!item.author.hideWeight && <Text style={styles.bodyText}>{item.author.weight}kg</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>구인글</Text>
        <TouchableOpacity onPress={openFilter} style={styles.filterIconBtn}>
          <Ionicons name="options-outline" size={22} color={activeFilterCount > 0 ? '#FF4B6E' : '#555'} />
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.genderTabs}>
        {(['여', '남'] as Gender[]).map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.genderTab, activeGender === g && styles.genderTabActive]}
            onPress={() => switchGender(g)}
          >
            <Text style={[styles.genderTabText, activeGender === g && styles.genderTabTextActive]}>
              {g === '여' ? '여성 구인글' : '남성 구인글'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderJob}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>조건에 맞는 글이 없어요</Text>
            <TouchableOpacity onPress={resetFilter}>
              <Text style={styles.resetText}>필터 초기화</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {selectedJob && (
        <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}

      <Modal visible={showFilter} animationType="slide" transparent>
        <View style={styles.filterOverlay}>
          <View style={styles.filterContainer}>
            <View style={styles.filterHeader}>
              <TouchableOpacity onPress={() => setShowFilter(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.filterTitle}>필터</Text>
              <TouchableOpacity onPress={resetFilter}>
                <Text style={styles.resetBtn}>초기화</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.filterSection}>지역</Text>
              <View style={styles.filterTags}>
                <TouchableOpacity
                  style={[styles.filterTag, !draftFilter.region && styles.filterTagActive]}
                  onPress={() => setDraftFilter({ ...draftFilter, region: undefined })}
                >
                  <Text style={[styles.filterTagText, !draftFilter.region && styles.filterTagTextActive]}>전체</Text>
                </TouchableOpacity>
                {REGIONS.map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={[styles.filterTag, draftFilter.region === r && styles.filterTagActive]}
                    onPress={() => setDraftFilter({ ...draftFilter, region: r })}
                  >
                    <Text style={[styles.filterTagText, draftFilter.region === r && styles.filterTagTextActive]}>{r}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.filterSection}>키</Text>
              <View style={styles.filterTags}>
                {HEIGHT_OPTIONS.map((opt) => {
                  const active = draftFilter.minHeight === opt.min && draftFilter.maxHeight === opt.max;
                  return (
                    <TouchableOpacity
                      key={opt.label}
                      style={[styles.filterTag, active && styles.filterTagActive]}
                      onPress={() => setDraftFilter({ ...draftFilter, minHeight: opt.min, maxHeight: opt.max })}
                    >
                      <Text style={[styles.filterTagText, active && styles.filterTagTextActive]}>{opt.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.filterSection}>몸무게</Text>
              <View style={styles.filterTags}>
                {WEIGHT_OPTIONS.map((opt) => {
                  const active = draftFilter.minWeight === opt.min && draftFilter.maxWeight === opt.max;
                  return (
                    <TouchableOpacity
                      key={opt.label}
                      style={[styles.filterTag, active && styles.filterTagActive]}
                      onPress={() => setDraftFilter({ ...draftFilter, minWeight: opt.min, maxWeight: opt.max })}
                    >
                      <Text style={[styles.filterTagText, active && styles.filterTagTextActive]}>{opt.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.filterSection}>성향 (중복 선택)</Text>
              <View style={styles.filterTags}>
                {PERSONALITIES.map((p) => {
                  const active = draftFilter.personalities.includes(p);
                  return (
                    <TouchableOpacity
                      key={p}
                      style={[styles.filterTag, active && styles.filterTagActive]}
                      onPress={() => togglePersonality(p)}
                    >
                      <Text style={[styles.filterTagText, active && styles.filterTagTextActive]}>{p}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={{ height: 20 }} />
            </ScrollView>

            <TouchableOpacity style={styles.applyBtn} onPress={applyFilter}>
              <Text style={styles.applyBtnText}>적용하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  filterIconBtn: { padding: 4, position: 'relative' },
  filterBadge: {
    position: 'absolute', top: 0, right: 0, width: 16, height: 16,
    borderRadius: 8, backgroundColor: '#FF4B6E', justifyContent: 'center', alignItems: 'center',
  },
  filterBadgeText: { fontSize: 10, color: '#fff', fontWeight: '700' },
  genderTabs: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  genderTab: { flex: 1, paddingVertical: 14, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  genderTabActive: { borderBottomColor: '#FF4B6E' },
  genderTabText: { fontSize: 15, color: '#aaa', fontWeight: '500' },
  genderTabTextActive: { color: '#FF4B6E', fontWeight: '700' },
  list: { padding: 12, paddingBottom: 80 },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 4,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  regionBadge: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  regionText: { fontSize: 12, color: '#FF4B6E', fontWeight: '600' },
  date: { fontSize: 12, color: '#aaa' },
  title: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 6 },
  description: { fontSize: 14, color: '#555', lineHeight: 20, marginBottom: 10 },
  tags: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 12 },
  tag: { backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 12, color: '#555' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  avatar: { width: 24, height: 24, borderRadius: 12 },
  authorName: { fontSize: 13, color: '#444' },
  bodyBadge: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  bodyText: { fontSize: 12, color: '#888' },
  bodyDot: { fontSize: 12, color: '#ccc' },
  empty: { flex: 1, alignItems: 'center', paddingTop: 80, gap: 10 },
  emptyIcon: { fontSize: 40 },
  emptyText: { fontSize: 16, color: '#888' },
  resetText: { fontSize: 14, color: '#FF4B6E', fontWeight: '600', marginTop: 4 },
  filterOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  filterContainer: {
    backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 20, paddingTop: 16, maxHeight: '85%',
  },
  filterHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  filterTitle: { fontSize: 17, fontWeight: '700', color: '#111' },
  resetBtn: { fontSize: 14, color: '#888' },
  filterSection: { fontSize: 14, fontWeight: '600', color: '#111', marginBottom: 10, marginTop: 16 },
  filterTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filterTag: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5, borderColor: '#ddd' },
  filterTagActive: { borderColor: '#FF4B6E', backgroundColor: '#fff0f3' },
  filterTagText: { fontSize: 13, color: '#666' },
  filterTagTextActive: { color: '#FF4B6E', fontWeight: '600' },
  applyBtn: { backgroundColor: '#FF4B6E', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginVertical: 16 },
  applyBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
