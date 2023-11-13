import { FC } from 'react';
import './LocalStorageView.css';
import { addCategory, deleteAllCategories, getCategories, getTasks } from '../LocalStorage';
import { Task } from '../models/Task';
import { Category } from '../models/Category';

interface LocalStorageViewProps {}

const LocalStorageView: FC<LocalStorageViewProps> = () => {

  const addCategoryName = () => {
    const name = (document.getElementById('category-name') as HTMLInputElement).value;
    if (name) {
      const category = new Category(1, name, "#000000");
      addCategory(category);
      window.location.reload();
    }
  }

  const deleteAll = () => {
    deleteAllCategories();
    window.location.reload();
  }

  return (
    <div className="LocalStorageView">
      <div>
        {
          getTasks().map((task: Task) => (
            <div>
              <div>{task.name}</div>
            </div>
          ))
        }
      </div>
      <div>
        <input type='text' id='category-name'></input>
        <button onClick={addCategoryName}>add</button>
        <button onClick={deleteAll}>clear</button>
        {
          getCategories().map((category: Category) => (
            <div>
              <div>{category.name}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default LocalStorageView;
