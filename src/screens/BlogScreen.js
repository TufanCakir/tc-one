import { useState, useEffect } from "react";
import {
  View,
  Button,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";

const STORAGE_KEY = "blog_posts";

const BlogScreen = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    savePosts();
  }, [posts]);

  const savePosts = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.error("Saving error:", e);
    }
  };

  const loadPosts = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPosts(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Loading error:", e);
    }
  };

  const addNewPost = () => {
    if (newPostTitle.trim() === "" || newPostContent.trim() === "") {
      setError("Title and content cannot be empty");
      return;
    }
    setError("");
    const id = Date.now();
    const newPost = { id, title: newPostTitle, content: newPostContent };
    setPosts([...posts, newPost]);
    resetInputs();
  };

  const updatePost = () => {
    if (!editingPost) return;
    if (newPostTitle.trim() === "" || newPostContent.trim() === "") {
      setError("Title and content cannot be empty");
      return;
    }
    setError("");
    const updated = posts.map((post) =>
      post.id === editingPost.id
        ? { ...post, title: newPostTitle, content: newPostContent }
        : post
    );
    setPosts(updated);
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingPost(null);
    resetInputs();
  };

  const resetInputs = () => {
    setNewPostTitle("");
    setNewPostContent("");
  };

  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    if (editingPost && editingPost.id === postId) {
      cancelEdit();
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={() => setSelectedPost(item)}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent}>{item.content}</Text>
      </TouchableOpacity>
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setEditingPost(item);
            setNewPostTitle(item.title);
            setNewPostContent(item.content);
            setError("");
          }}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deletePost(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.listWrapper}>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.inputWrapper}>
          {error !== "" && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Enter Title"
            placeholderTextColor="#aaa"
            value={newPostTitle}
            onChangeText={setNewPostTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter Content"
            placeholderTextColor="#aaa"
            value={newPostContent}
            onChangeText={setNewPostContent}
            multiline
          />
          {editingPost ? (
            <View style={styles.editActions}>
              <Button title="Save Changes" onPress={updatePost} />
              <Button title="Cancel" onPress={cancelEdit} color="#888" />
            </View>
          ) : (
            <Button title="Add New Post" onPress={addNewPost} />
          )}
        </View>
        {selectedPost && (
          <View style={styles.selectedPostContainer}>
            <Text style={styles.selectedPostTitle}>{selectedPost.title}</Text>
            <Text style={styles.selectedPostContent}>
              {selectedPost.content}
            </Text>
            <Button title="Close" onPress={() => setSelectedPost(null)} />
          </View>
        )}
        <Footer />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  listWrapper: {
    flex: 1,
    padding: 20,
  },
  inputWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#fff",
  },
  postContainer: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  postContent: {
    fontSize: 16,
    color: "white",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    alignSelf: "flex-start",
  },
  editButtonText: {
    color: "blue",
  },
  deleteButton: {
    alignSelf: "flex-end",
  },
  deleteButtonText: {
    color: "red",
  },
  selectedPostContainer: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  selectedPostTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  selectedPostContent: {
    fontSize: 16,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: "white",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  editActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default BlogScreen;
