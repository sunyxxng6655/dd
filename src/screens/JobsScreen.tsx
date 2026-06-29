import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { jobPostings } from '../data/mockData';
import { JobPosting } from '../types';
import JobDetailModal from '../components/JobDetailModal';

const categoryColors: Record<string, string> = {
  공동창업: '#FF4B6E',
  파트타임: '#4B9EFF',
  사이드프로젝트: '#9B59B6',
  단기프로젝트: '#27AE60',
};

export default function JobsScreen() {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  const renderJob = ({ item }: { item: JobPosting }) => (
    <TouchableOpacity style={styles.card} onPress={() => setSelectedJob(item)} activeOpacity={0.8}>
      <View style={styles.cardTop}>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: categoryColors[item.category] + '20' },
          ]}
        >
          <Text style={[styles.categoryText, { color: categoryColors[item.category] }]}>
            {item.category}
          </Text>
        </View>
        <Text style={styles.date}>{item.createdAt}</Text>
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.tags}>
        {item.requirements.slice(0, 2).map((req, i) => (
          <View key={i} style={styles.tag}>
            <Text style={styles.tagText}>{req}</Text>
          </View>
        ))}
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.authorRow}>
          <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
          <Text style={styles.authorName}>{item.author.name}</Text>
          <Text style={styles.location}>
            <Ionicons name="location-outline" size={12} /> {item.location}
          </Text>
        </View>
        {item.salary && (
          <Text style={styles.salary}>{item.salary}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>구인글</Text>
        <Text style={styles.headerSub}>함께할 사람을 찾아보세요</Text>
      </View>

      <FlatList
        data={jobPostings}
        keyExtractor={(item) => item.id}
        renderItem={renderJob}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#fff',
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#111' },
  headerSub: { fontSize: 13, color: '#888', marginTop: 2 },
  list: { padding: 12, paddingBottom: 80 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  categoryBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  categoryText: { fontSize: 12, fontWeight: '600' },
  date: { fontSize: 12, color: '#aaa' },
  title: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 6 },
  description: { fontSize: 14, color: '#555', lineHeight: 20, marginBottom: 10 },
  tags: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 12 },
  tag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: { fontSize: 12, color: '#555' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  avatar: { width: 24, height: 24, borderRadius: 12 },
  authorName: { fontSize: 13, fontWeight: '500', color: '#444' },
  location: { fontSize: 12, color: '#888' },
  salary: { fontSize: 13, fontWeight: '600', color: '#FF4B6E' },
});
