using System;
using System.Text.RegularExpressions;
using System.Windows.Forms;

namespace MovePoints
{
    public partial class MovePoints : Form
    {
        public MovePoints()
        {
            InitializeComponent();
        }

        private void MovePoints_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            string text = richTextBox1.Text;

            string pattern = "(\".+\\s\\[)([0-9]+),\\s([0-9]+)(,.+\\])";

            foreach (Match match in Regex.Matches(text, pattern))
            {
                int x = Convert.ToInt32(match.Groups[2].Value) + (int)numericUpDown1.Value;
                int y = Convert.ToInt32(match.Groups[3].Value) + (int)numericUpDown2.Value;

                string line = match.Groups[1].Value + Convert.ToString(x) + ", " + Convert.ToString(y) + match.Groups[4].Value + ",\n"; 
                richTextBox2.AppendText(line);
            }
        }
    }
}
