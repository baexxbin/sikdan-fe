<button class="bg-gray-200 px-3 py-1 rounded" @click="onLogout">
  로그아웃
</button>

<script setup>
import { useAuth } from "~/composables/useAuth";
import { useRouter } from "vue-router";

const { logout } = useAuth();
const router = useRouter();

const onLogout = () => {
  logout();
  router.push("/login");
};
</script>
