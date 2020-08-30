/**
 * A Generic Base object representation.
 */
interface Base {
  id: string;
  title: string;
  description: string;
  is_deleted: boolean;
}

/**
 * A Skill representation.
 */
interface Skill extends Base {
  parents: string[];
  is_learnt: boolean;
  is_deleted: boolean;
  children: Skill[];
}

/**
 * A Skilltree representation.
 */
class Skilltree implements Base {
  id: string;
  description: string;
  is_deleted: false;
  title: string;
  skills: Skill[];

  constructor(id: string, title: string, description: string, skills: Skill[] = []) {
    this.id = id;
    this.skills = skills;
    this.is_deleted = false;
    this.title = title;
    this.description = description;
  }

  /**
   * Add a new skill to the skilltree.
   * @param skill a skill to be added;
   */
  add_skill = (skill: Skill) => {
    this.skills.push({
      ...skill,
      children: [],
      is_deleted: skill.is_deleted ?? false,
    });
    return skill;
  };

  /**
   * Mark a skill as is_deleted if found.
   * @param id id of wanted skill;
   */
  disable_skill = (skill_id: string): void => {
    const skill = this.get_skill(skill_id);

    if (skill) {
      const filtered_skills = this.skills.filter((skl) => skl.id !== skill_id);
      this.skills = [...filtered_skills, { ...skill, is_deleted: true }];
    }
  };

  /**
   * Get a skill on given skill_id.
   * @param skill_id id of wanted skill;
   */
  get_skill = (skill_id: string): Skill | null => {
    const skill = this.skills.find((skl) => skl.id === skill_id);

    return skill ?? null;
  };

  /**
   * Get all non-is_deleted skills from the from a given skilltree;
   * @param skilltree_id id of a wanted skillstree;
   */
  get_skills = (is_learnt: boolean | null = null) => {
    return this.skills.filter(
      (skill) =>
        !skill.is_deleted &&
        (is_learnt === null ? true : skill.is_learnt === is_learnt)
    );
  };

  /**
   * Removes all skills from the Skilltree;
   */
  wipe = () => {
    this.skills = [];
  };

  /**
   * Creates an adjancency list to get the graph of skills.
   */
  #get_adjacency_list = () => {
    const adjacency_list = this.skills.map((skill) => skill.parents);
    return adjacency_list;
  };
}

export default Skilltree;
