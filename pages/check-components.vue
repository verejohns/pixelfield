<template>
  <div class="check-components">
    <div class="main-container">
      <div class="user-info-container">
        <UserInfo :user="user" />
        <InvitationUserCard :user="user" />
        <SearchStudents />
      </div>
      <div class="study-group-container">
        <StudyGroup :group="group" />
        <StudyGroup :group="group" />
      </div>
      <div class="empty-students-container">
        <EmptyStudents />
      </div>
      <div class="empty-groups-container">
        <EmptyGroups />
      </div>
    </div>
    <div class="tabs-container">
      <Tab :tabs="tabs" />
    </div>
    <div class="tabs-content-container">
      <div class="overview-container">
        <Overview />
        <StudyGroupTab />
        <Students />
      </div>
    </div>
    <div>
      <h1>Coach</h1>
      <!-- <EditGroupTile /> -->
      <EmptyCoaches />
      <InvitationCoachCard :coach="coach" />
      <SearchCoaches />
      <StudyGroupTabUser />
    </div>
    <div>
      <h1>Layout</h1>
      <AuthHeader />
      <Footer />
      <NavMenu page="profile" />
      <OnboardingHeader />
      <TestsHeader />
    </div>
    <div>
      <h1>UI</h1>
      <Button
        :label="$t('decline')"
        type="decline"
        size="large"
        position="right"
        width="208px"
        height="40px"
        padding-top="12px"
      />
      <GoogleButton label="login" />
      <GroupEditButton />
      <LevelButton label="button" :selected="optionName" />
      <QuestionButton label="question" />
      <RoleButton :selected="false" label="student" />
      <UserAcceptCoachRequestButton />
      <SendMessageButton />
      <PasswordField label="password" :validation-rules="[]" />
      <CheckBox />
      <IconSet :competition="competition" />
      <Chip text="chip" :coach-detail="true" :group-detail="false" />
      <CompetitionPlayerTile />
      <CompetitionTile :icons="true" :resized="true" :closed="false" />
      <DynamicShow :label="'giuadbjk'" />
      <ImageUploader />
      <InfoCard :card="item" />
      <RankingTile :first="false" />
    </div>
    <Notification />
  </div>
</template>

<script>
import Chip from "~/components/ui/Chip.vue";
import CompetitionPlayerTile from "~/components/ui/CompetitionPlayerTile.vue";
import CompetitionTile from "~/components/ui/CompetitionTile.vue";
import DynamicShow from "~/components/ui/DynamicShow.vue";
import ImageUploader from "~/components/ui/ImageUploader.vue";
import InfoCard from "~/components/ui/InfoCard.vue";
import RankingTile from "~/components/ui/RankingTile.vue";

import IconSet from "~/components/ui/icon-set/CompetitionIconSet.vue";
import AuthHeader from "~/components/layout/AuthHeader.vue";
import CheckBox from "~/components/ui/controls/Checkbox.vue";
import Footer from "~/components/layout/Footer.vue";
import NavMenu from "~/components/layout/NavMenu.vue";
import PasswordField from "~/components/ui/fields/PasswordField.vue";
import OnboardingHeader from "~/components/layout/OnboardingHeader.vue";
import TestsHeader from "~/components/layout/TestsHeader.vue";

import Button from "~/components/ui/buttons/Button.vue";
import GoogleButton from "~/components/ui/buttons/GoogleButton.vue";
import GroupEditButton from "~/components/ui/buttons/GroupEditButton";
import LevelButton from "~/components/ui/buttons/LevelButton.vue";
import QuestionButton from "~/components/ui/buttons/QuestionButton.vue";
import RoleButton from "~/components/ui/buttons/RoleButton.vue";
import UserAcceptCoachRequestButton from "~/components/ui/buttons/UserAcceptCoachRequestButton.vue";

import SendMessageButton from "~/components/ui/buttons/SendMessageButton.vue";

import UserInfo from "~/components/coach/UserInfo";
import StudyGroup from "~/components/coach/StudyGroup";
import Tab from "~/components/coach/Tab";
import EmptyStudents from "~/components/coach/EmptyStudents";
import EmptyGroups from "~/components/coach/EmptyGroups";
import Overview from "~/components/coach/Overview";
import StudyGroupTab from "~/components/coach/StudyGroupTab";
import Students from "~/components/coach/Students";
import InvitationUserCard from "~/components/coach/InvitationUserCard";
import SearchStudents from "~/components/coach/SearchStudents";
import Notification from "~/components/ui/Notification";
// import EditGroupTile from "~/components/coach/EditGroupTile";
import EmptyCoaches from "~/components/coach/EmptyCoaches";
import InvitationCoachCard from "~/components/coach/InvitationCoachCard";
import SearchCoaches from "~/components/coach/SearchCoaches";
import StudyGroupTabUser from "~/components/coach/StudyGroupTabUser";

export default {
  name: "CheckComponents",
  components: {
    UserInfo,
    StudyGroup,
    Tab,
    AuthHeader,
    PasswordField,
    CheckBox,
    Chip,
    CompetitionPlayerTile,
    CompetitionTile,
    DynamicShow,
    ImageUploader,
    InfoCard,
    RankingTile,
    Button,
    GoogleButton,
    GroupEditButton,
    LevelButton,
    QuestionButton,
    RoleButton,
    UserAcceptCoachRequestButton,
    SendMessageButton,
    IconSet,
    Footer,
    NavMenu,
    OnboardingHeader,
    TestsHeader,
    StudyGroupTabUser,
    EmptyCoaches,
    InvitationCoachCard,
    SearchCoaches,
    EmptyStudents,
    EmptyGroups,
    Overview,
    StudyGroupTab,
    Students,
    InvitationUserCard,
    SearchStudents,
    Notification,
  },
  data() {
    return {
      item: {
        icon: "whh_student",
        title: "vyuka",
        subtitle: "mat",
        text: "Secondary line text goes here Secondary line text goes here",
        image: "learn",
      },
      id: 10,
      competition: {
        id: 1,
        participants: 1,
        attempted: 6,
        title: "Experimental Competition",
        active_from: "2021-06-25T13:14:54+02:00",
        active_to: "2022-06-25T13:14:56+02:00",
        access_level: "intermediate",
        time_limit: 3600,
        lives: 3,
        attempts: 10,
        is_ranked: true,
        is_chess_to_schools: false,
      },
      option: 0,
      optionName: "",
      coach: {
        display_name: "Jan Novák",
        avatar: require("~/assets/images/avatar.png"),
      },
      user: {
        id: 1,
        user: {
          display_name: "Jan Novák",
          level: "beginner",
          avatar: require("~/assets/images/avatar.png"),
        },
      },
      group: {
        id: 1,
        title: "Coach's group 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu...",
        student_count: 10,
      },
      tabs: ["overview", "study_groups", "students"],
    };
  },
  mounted() {
    this.$nuxt.$emit("success", "invitations_sent");
    this.$store.dispatch("coach/inviteStudents", {
      payload: {
        group_id: 5,
        student_ids: [1, 8, 12],
      },
    });
  },
  methods: {},
};
</script>

<style lang="scss">
@import "/assets/scss/pages/check-components";
</style>
